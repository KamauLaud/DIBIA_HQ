// og.mjs — renders assets/og-card.png (1200×630) from an inline HTML card using the site's own tokens/fonts.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { site, pubs } from './render.mjs';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const fontsDir = fs.readdirSync(path.join(ROOT, '_ds')).map((d) => path.join(ROOT, '_ds', d, 'assets/fonts')).find((d) => fs.existsSync(d));
const mime = { '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
const dataUri = (fp) => `data:${mime[path.extname(fp)]};base64,${fs.readFileSync(fp).toString('base64')}`;
const font = (f) => dataUri(path.join(fontsDir, f));
const forthcoming = pubs.filter((p) => p.public && p.group === 'forthcoming' && p.status !== 'in-submission').map((p) => `${p.badge} · ${(p.statusLabel || '').split(' ·')[0]}`).join('   ·   ');
const photo = dataUri(path.join(ROOT, site.photo));
const mark = dataUri(path.join(ROOT, 'assets/brand/dibia-mark.webp'));

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Montserrat;src:url("${font('Montserrat-VariableFont_wght.ttf')}");font-weight:100 900}
@font-face{font-family:Kameron;src:url("${font('Kameron-VariableFont_wght.ttf')}");font-weight:400 700}
@font-face{font-family:"Space Mono";src:url("${font('space-mono-latin-700-normal.woff2')}");font-weight:700}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:oklch(13% 0.02 300);color:oklch(92% 0.01 300);font-family:Kameron,Georgia,serif;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(700px 420px at 78% 110%, oklch(58% 0.26 300/0.28), transparent 70%),radial-gradient(520px 320px at 6% 0%, oklch(72% 0.17 163/0.12), transparent 70%)}
.scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 3px,oklch(0% 0 0/0.18) 3px 4px)}
.wrap{position:relative;display:flex;height:100%;padding:64px 72px;box-sizing:border-box;gap:56px;align-items:center}
.left{flex:1 1 auto;min-width:0}
.kicker{font-family:"Space Mono";font-weight:700;font-size:15px;letter-spacing:0.22em;color:oklch(76% 0.16 300)}
h1{margin:22px 0 0;font-family:Montserrat;font-weight:800;font-size:84px;line-height:0.98;letter-spacing:-0.01em;color:oklch(98% 0.005 300)}
.role{margin:20px 0 0;font-family:"Space Mono";font-weight:700;font-size:14px;letter-spacing:0.18em;color:oklch(80% 0.16 85)}
.thesis{margin:26px 0 0;max-width:620px;font-style:italic;font-size:27px;line-height:1.3;color:oklch(85% 0.1 300)}
.rec{margin:28px 0 0;font-family:"Space Mono";font-weight:700;font-size:14px;letter-spacing:0.16em;color:oklch(72% 0.02 300)}
.frame{flex:0 0 300px;height:400px;position:relative;border:1px solid oklch(72% 0.17 163/0.55);clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%);box-shadow:0 8px 24px oklch(0% 0 0/0.45),0 0 40px oklch(72% 0.17 163/0.22);overflow:hidden;background:oklch(10% 0.015 300)}
.frame img{width:100%;height:100%;object-fit:cover;object-position:50% 20%;display:block}
.bar{position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,oklch(58% 0.26 300),oklch(76% 0.13 205) 40%,oklch(72% 0.17 163) 75%,oklch(80% 0.16 85))}
.brand{position:absolute;right:72px;top:26px;display:flex;align-items:center;gap:12px;font-family:"Space Mono";font-weight:700;font-size:12px;letter-spacing:0.18em;color:oklch(52% 0.025 300)}
.brand img{height:64px;width:auto;display:block}
</style></head><body><div class="glow"></div><div class="scan"></div>
<div class="brand"><span>#TECH4GUD</span><img src="${mark}" alt=""></div>
<div class="wrap"><div class="left">
<div class="kicker">XR PRIVACY · GAZE · CONTEXT-AWARE AR</div>
<h1>Dr. Cory<br>“Ike” Ilo</h1>
<div class="role">PHD, COMPUTER SCIENCE · VIRGINIA TECH ’26 · FOUNDER, DIBIA</div>
<p class="thesis">“${site.thesis}”</p>
<div class="rec">${forthcoming}</div>
</div><div class="frame"><img src="${photo}"></div></div><div class="bar"></div></body></html>`;

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(ROOT, 'assets/og-card.png'), type: 'png' });
await browser.close();
console.log('✓ assets/og-card.png', (fs.statSync(path.join(ROOT, 'assets/og-card.png')).size / 1024).toFixed(0), 'KB');
