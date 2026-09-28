// check.mjs — load the EXPORTED pages (no runtime) in headless Chromium and assert:
//   • no external network requests (fonts, CDNs) — the site must be self-contained
//   • no console errors / 404s for local assets
//   • every internal link target exists; every <img> loads; no image-slot left; site.js removes no links
// Writes screenshots to .tmp/shots/<page>.png (full page, 1280 wide) and .tmp/shots/<page>-mobile.png.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PAGES = ['index', 'research', 'cv', 'org', 'marketplace', 'contact', 'paper-arpa', 'paper-goldilocks', 'paper-inplaingaze'];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.bib': 'text/plain', '.json': 'application/json' };
const srv = http.createServer((req, r) => {
  const rel = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  const fp = path.join(ROOT, rel === '/' ? 'index.html' : rel);
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) { r.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream' }); return fs.createReadStream(fp).pipe(r); }
  r.writeHead(404); r.end('404 ' + rel);
});
srv.listen(0, '127.0.0.1', async () => {
  const port = srv.address().port;
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  fs.mkdirSync(path.join(ROOT, '.tmp/shots'), { recursive: true });
  let failures = 0;
  const seenLinks = new Set();
  for (const page of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    const external = [], errors = [], notFound = [];
    p.on('request', (r) => { if (!r.url().startsWith(`http://127.0.0.1:${port}`)) external.push(r.url()); });
    p.on('response', (r) => { if (r.status() >= 400) notFound.push(r.status() + ' ' + r.url().replace(`http://127.0.0.1:${port}`, '')); });
    p.on('pageerror', (e) => errors.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await p.goto(`http://127.0.0.1:${port}/${page}.html`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(600);
    // load lazy images too, so the broken-image check (and the screenshots) cover the whole page
    await p.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }));
    await p.waitForLoadState('networkidle');
    await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));   // paint off-screen images for the full-page shot
    const linksLost = await p.evaluate(async () => {   // site.js must never destroy links present in the static HTML
      const raw = new DOMParser().parseFromString(await (await fetch(location.href)).text(), 'text/html');
      return raw.querySelectorAll('a[href]').length - document.querySelectorAll('a[href]').length;
    });
    const info = await p.evaluate(() => ({
      title: document.title, scripts: [...document.scripts].map((s) => s.src.replace(location.origin + '/', '') || 'inline'),
      hover: !!document.querySelector('style[data-dc-pseudo]'), ld: !!document.querySelector('script[type="application/ld+json"]'),
      braces: /\{\{/.test(document.body.innerText),
      brokenImgs: [...document.images].filter((i) => !i.complete || !i.naturalWidth).map((i) => i.getAttribute('src')),
      slotsLeft: document.querySelectorAll('image-slot,x-import').length,
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
    }));
    info.links.forEach((h) => { if (!/^(https?:|mailto:|#)/.test(h)) seenLinks.add(h.split('#')[0]); });
    await p.screenshot({ path: path.join(ROOT, `.tmp/shots/${page}.png`), fullPage: true });
    await p.setViewportSize({ width: 390, height: 844 });
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(ROOT, `.tmp/shots/${page}-mobile.png`), fullPage: true });
    const bad = external.length || errors.length || notFound.length || info.braces || !info.hover || !info.ld || info.brokenImgs.length || info.slotsLeft || linksLost || info.scripts.some((s) => s !== 'assets/site.js' && s !== 'inline');
    if (bad) failures++;
    console.log(`${bad ? '✗' : '✓'} ${page}.html — "${info.title}"`);
    if (external.length) console.log('   external requests:', external.join(', '));
    if (errors.length) console.log('   errors:', errors.join(' | ').slice(0, 400));
    if (notFound.length) console.log('   not found:', notFound.join(', '));
    if (info.braces) console.log('   unrendered {{ }} left in body');
    if (!info.hover) console.log('   missing hover stylesheet');
    if (!info.ld) console.log('   missing JSON-LD');
    if (info.brokenImgs.length) console.log('   broken images:', info.brokenImgs.join(', '));
    if (info.slotsLeft) console.log(`   ${info.slotsLeft} unexported <image-slot>/<x-import> left (renders blank without the runtime)`);
    if (linksLost) console.log(`   ${linksLost} link(s) in the HTML are gone after site.js ran`);
    console.log('   scripts:', info.scripts.join(', '));
    await ctx.close();
  }
  const missing = [...seenLinks].filter((h) => h && !fs.existsSync(path.join(ROOT, h)));
  if (missing.length) { failures++; console.log('✗ dangling internal links:', missing.join(', ')); } else console.log(`✓ all ${seenLinks.size} internal link targets exist`);
  await browser.close(); srv.close();
  console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed');
  process.exit(failures ? 1 : 0);
});
