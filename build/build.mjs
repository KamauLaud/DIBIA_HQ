// build.mjs — the whole pipeline:
//   1. render.mjs fills data/*.json into src/*.html → .tmp/*.html
//   2. Playwright loads each .tmp page with the dc-runtime (React/Babel served from node_modules, never the CDN),
//      waits for hydration, then strips the runtime in-page and injects meta/JSON-LD/site.js
//   3. writes the static result to <root>/<page>.html  — zero framework bytes at runtime
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';
import { renderAll, site, pubs, warnings } from './render.mjs';
import { pages as PAGE_META } from './pages.mjs';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.ico': 'image/x-icon', '.webp': 'image/webp' };
const CDN = {
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js': 'node_modules/react/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js': 'node_modules/react-dom/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js': 'node_modules/@babel/standalone/babel.min.js'
};

// static server: .tmp/ (filled templates) → src/ (runtime) → root (assets, _ds)
function serve() {
  return new Promise((res) => {
    const srv = http.createServer((req, r) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      const rel = url === '/' ? '/index.html' : url;
      for (const base of ['.tmp', 'src', '.']) {
        const fp = path.join(ROOT, base, rel);
        if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
          r.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream' });
          return fs.createReadStream(fp).pipe(r);
        }
      }
      r.writeHead(404); r.end('not found: ' + rel);
    }).listen(0, '127.0.0.1', () => res(srv));
  });
}

const year = new Date().getFullYear();
function jsonLd(page) {
  const base = site.baseUrl.replace(/\/$/, '');
  const url = `${base}/${page === 'index' ? '' : page + '.html'}`;
  const sameAs = Object.values(site.links).filter(Boolean);
  const person = {
    '@type': 'Person', '@id': `${base}/#person`, name: site.fullName, alternateName: [site.name, 'Cory Ilo', 'Ike Ilo'],
    givenName: 'Cory', familyName: 'Ilo', honorificSuffix: 'PhD', jobTitle: 'XR Privacy Researcher · Founder, DIBIA',
    url: `${base}/`, image: `${base}/${site.photo}`, worksFor: { '@id': `${base}/#dibia` }, email: [site.email, site.emailAcademic].filter(Boolean).map((e) => `mailto:${e}`),
    alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Virginia Tech' }, { '@type': 'CollegeOrUniversity', name: 'Rochester Institute of Technology' }],
    knowsAbout: site.keywords.concat(['Privacy-Preserving Machine Learning', 'Mixed Reality', 'Virtual Reality', 'User Studies']),
    sameAs
  };
  const graph = [
    { '@type': 'WebSite', '@id': `${base}/#website`, url: `${base}/`, name: site.name, publisher: { '@id': `${base}/#person` } },
    person,
    { '@type': 'Organization', '@id': `${base}/#dibia`, name: site.brand, url: `${base}/org.html`, logo: { '@type': 'ImageObject', url: `${base}/${site.logo}`, width: 512, height: 512 }, founder: { '@id': `${base}/#person` } },
    { '@type': PAGE_META[page].type, '@id': `${url}#page`, url, name: PAGE_META[page].title, description: PAGE_META[page].description, isPartOf: { '@id': `${base}/#website` }, mainEntity: { '@id': `${base}/#person` } }
  ];
  if (page.startsWith('paper-')) {
    const map = { 'paper-arpa': 'privacy-on-autopilot-ismar26', 'paper-goldilocks': 'goldilocks-sui24', 'paper-inplaingaze': 'hidden-in-plain-gaze' };
    const p = pubs.find((x) => x.id === map[page]);
    if (p && p.status !== 'in-submission') graph.push({ '@type': 'ScholarlyArticle', headline: p.title, author: p.authors.map((a) => ({ '@type': 'Person', name: a })), datePublished: String(p.year), publisher: p.venue, ...(p.links?.doi ? { sameAs: `https://doi.org/${p.links.doi}` } : {}), url });
  }
  if (page === 'index' || page === 'research') {
    graph.push(...pubs.filter((p) => p.public && p.group !== 'degree' && p.status !== 'in-submission').map((p) => ({ '@type': 'ScholarlyArticle', headline: p.title, author: p.authors.map((a) => ({ '@type': 'Person', name: a })), datePublished: String(p.year), publisher: p.venue, ...(p.links?.doi ? { sameAs: `https://doi.org/${p.links.doi}` } : {}), ...(p.links?.page ? { url: `${base}/${p.links.page}` } : {}) })));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

// runs INSIDE the hydrated page: strip the runtime, inject metadata, tag dynamic bits for site.js
const CLEANUP = ({ meta, ld, canonical, ogImage, twitter, slots, name }) => {
  const d = document;
  // image-slot draws its picture inside a shadow root, which outerHTML drops → swap each slot for a plain <img>
  // sized by the template's own style (hydration loses it), or a same-size empty frame while a slot has no image
  d.querySelectorAll('image-slot').forEach((slot) => {
    const src = slot.getAttribute('src');
    const shape = (slot.getAttribute('shape') || 'rounded').toLowerCase();
    const n = parseFloat(slot.getAttribute('radius'));
    const radius = shape === 'circle' ? '50%' : shape === 'pill' ? '9999px' : shape === 'rounded' ? `${Number.isFinite(n) ? n : 12}px` : '0';
    const fit = (slot.getAttribute('fit') || 'cover').toLowerCase() === 'contain' ? 'contain' : 'cover';
    const el = d.createElement(src ? 'img' : 'div');
    el.setAttribute('style', `display:block;${slots[slot.id] || 'width:100%;aspect-ratio:3/2'};object-fit:${fit};border-radius:${radius}`);
    if (src) {
      const alt = /^(headshot-|alch-cory)/.test(slot.id) ? name : (slot.getAttribute('placeholder') || '').replace(/^Drop\s+(a |an |the |your )?/i, '').replace(/^./, (c) => c.toUpperCase());
      Object.entries({ src, alt, loading: 'lazy', decoding: 'async' }).forEach(([k, v]) => el.setAttribute(k, v));
    } else el.setAttribute('aria-hidden', 'true');
    slot.replaceWith(el);
  });
  d.querySelectorAll('script').forEach((s) => s.remove());               // support.js, dc-script, unpkg, babel output, _ds_bundle
  d.querySelectorAll('link[href*="fonts.googleapis"],link[href*="fonts.gstatic"],link[rel="preconnect"]').forEach((l) => l.remove());
  d.querySelectorAll('[data-dc-tpl]').forEach((e) => e.removeAttribute('data-dc-tpl'));
  d.querySelectorAll('[sc-name]').forEach((e) => e.removeAttribute('sc-name'));
  d.querySelectorAll('meta[name="viewport"]').forEach((m, i) => { if (i) m.remove(); });
  d.querySelectorAll('x-dc').forEach((x) => x.remove());
  // videos: hydration drops the muted property → autoplay would be blocked
  d.querySelectorAll('video').forEach((v) => { v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('controls', ''); v.setAttribute('loop', ''); v.setAttribute('preload', 'metadata'); if (v.hasAttribute('autoplay') || v.autoplay) v.setAttribute('autoplay', ''); });
  d.querySelectorAll('[data-more]').forEach((r) => r.setAttribute('hidden', ''));   // React drops hidden="" during hydration
  // hero photo cycle → marker for site.js
  d.querySelectorAll('img[src*="assets/photos/cory-"]').forEach((img) => { const p = img.parentElement; if (p && p.querySelectorAll('img').length >= 3) p.setAttribute('data-photo-cycle', ''); });
  d.querySelectorAll('[data-photo-cycle] img').forEach((img, i) => img.setAttribute('alt', i ? '' : name));   // one announced portrait; the crossfade copies are decorative
  // <head>: title, description, canonical, OG/Twitter, JSON-LD, favicon
  d.title = meta.title;
  const head = d.head;
  const put = (tag, attrs) => { const el = d.createElement(tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); head.appendChild(el); return el; };
  head.querySelectorAll('meta[name="description"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"],script[type="application/ld+json"],link[rel="icon"],link[rel="apple-touch-icon"]').forEach((e) => e.remove());
  put('meta', { name: 'description', content: meta.description });
  put('link', { rel: 'canonical', href: canonical });
  put('link', { rel: 'icon', href: 'assets/brand/favicon-32.png', sizes: '32x32', type: 'image/png' });
  put('link', { rel: 'icon', href: 'assets/brand/icon-192.png', sizes: '192x192', type: 'image/png' });
  put('link', { rel: 'apple-touch-icon', href: 'assets/brand/apple-touch-icon.png' });
  put('meta', { name: 'theme-color', content: '#1a1523' });
  [['og:type', meta.type === 'ProfilePage' ? 'profile' : 'website'], ['og:site_name', 'Cory “Ike” Ilo — DIBIA'], ['og:title', meta.title], ['og:description', meta.description], ['og:url', canonical], ['og:image', ogImage], ['og:image:width', '1200'], ['og:image:height', '630']].forEach(([p, c]) => put('meta', { property: p, content: c }));
  [['twitter:card', 'summary_large_image'], ['twitter:title', meta.title], ['twitter:description', meta.description], ['twitter:image', ogImage]].forEach(([n, c]) => put('meta', { name: n, content: c }));
  const s = d.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(ld); head.appendChild(s);
  const js = d.createElement('script'); js.src = 'assets/site.js'; js.defer = true; d.body.appendChild(js);
  // generated hover rules: keep, but mark so we can find them
  d.querySelectorAll('style').forEach((st) => { if (/:hover/.test(st.textContent) && !st.hasAttribute('data-src')) st.setAttribute('data-dc-pseudo', ''); });
  return d.documentElement.outerHTML;
};

async function main() {
  const t0 = Date.now();
  const pageIds = renderAll();
  const srv = await serve();
  const port = srv.address().port;
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: true });
  await ctx.route(/unpkg\.com/, (route) => {
    const local = CDN[route.request().url()];
    if (!local) return route.abort();
    route.fulfill({ status: 200, contentType: 'text/javascript', body: fs.readFileSync(path.join(ROOT, local)) });
  });
  const base = site.baseUrl.replace(/\/$/, '');
  for (const page of pageIds) {
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await p.goto(`http://127.0.0.1:${port}/${page}.html`, { waitUntil: 'networkidle' });
    await p.waitForFunction(() => {
      const x = document.querySelector('#dc-root');
      return x && x.children.length > 0 && !/\{\{/.test(document.body.innerText) && !document.querySelector('sc-if,x-import,x-dc');
    }, null, { timeout: 30000 });
    await p.waitForTimeout(700);
    const meta = PAGE_META[page];
    const canonical = `${base}/${page === 'index' ? '' : page + '.html'}`;
    const slots = {};   // image-slot id → the template's style attribute
    for (const [, attrs] of fs.readFileSync(path.join(ROOT, '.tmp', `${page}.html`), 'utf8').matchAll(/<x-import component-from-global-scope="image-slot"([^>]*)>/g)) {
      const id = attrs.match(/\sid="([^"]*)"/), style = attrs.match(/\sstyle="([^"]*)"/);
      if (id && style) slots[id[1]] = style[1];
    }
    const html = await p.evaluate(CLEANUP, { meta, ld: jsonLd(page), canonical, ogImage: `${base}/${site.ogImage}`, slots, name: site.name });
    fs.writeFileSync(path.join(ROOT, `${page}.html`), '<!DOCTYPE html>\n' + html + '\n');
    const size = (fs.statSync(path.join(ROOT, `${page}.html`)).size / 1024).toFixed(0);
    console.log(`✓ ${page}.html  ${size} KB${errors.length ? '  ⚠ ' + errors.join(' | ').slice(0, 300) : ''}`);
    await p.close();
  }
  await browser.close();
  srv.close();
  if (warnings.length) { console.log('\nContent flags (not rendered on the site):'); warnings.forEach((w) => console.log('  • ' + w)); }
  console.log(`\nbuilt in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
main().catch((e) => { console.error(e); process.exit(1); });
