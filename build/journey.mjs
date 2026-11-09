// journey.mjs — data/journey.json → the Receipts + Journey sections (static HTML) and assets/journey.css.
// Layout is computed here at build time, so the timeline is complete HTML with JS off:
//   • time-scaled x axis (PX_PER_YEAR), one lane per kind, greedy sub-rows so cards never overlap
//   • claim filters are radio inputs + CSS :has() — no JS needed to trace a claim
//   • assets/site.js only adds the thread line, the detail panel, prev/next, and the scroll-to-now
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const J = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/journey.json'), 'utf8'));
const PEOPLE = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/people.json'), 'utf8')).people;

const PX_PER_YEAR = 190, CARD_W = 184, EVENT_W = 160, CARD_H = 112, ROW_GAP = 10, LANE_PAD = 14, LABEL_W = 108, GAP = 8;
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const KINDS = [
  { id: 'academic', label: 'Academic' },
  { id: 'industry', label: 'Industry' },
  { id: 'guild', label: 'Guild' }
];

const ym = (s) => { const [y, m] = s.split('-').map(Number); return y + ((m || 1) - 1) / 12; };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = (s) => { const [y, m] = s.split('-'); return m ? `${MONTHS[+m - 1]} ${y}` : y; };  // 'YYYY' renders as the year alone

export function renderJourney(now = new Date()) {
  const t0 = ym(J.range.start), t1 = ym(J.range.end);
  const tNow = now.getFullYear() + now.getMonth() / 12 + (now.getDate() - 1) / 365;
  const X = (t) => Math.round((t - t0) * PX_PER_YEAR);
  const width = X(t1);
  const claims = Object.fromEntries(J.claims.map((c) => [c.id, c]));
  const byId = Object.fromEntries(J.entries.map((e) => [e.id, e]));
  const person = (id) => PEOPLE.find((p) => p.id === id);

  // ── layout: per lane, greedy sub-rows by start time ─────────────────────
  const lanes = KINDS.map((k) => {
    const items = J.entries.filter((e) => e.kind === k.id).sort((a, b) => ym(a.start) - ym(b.start));
    const rows = [];
    for (const e of items) {
      const left = X(ym(e.start));
      const endT = e.type === 'span' ? (e.end ? ym(e.end) : tNow) : ym(e.start);
      const dur = Math.max(2, X(endT) - left);
      const w = e.type === 'span' ? Math.max(dur, CARD_W) : EVENT_W;
      let r = rows.findIndex((right) => right + GAP <= left);
      if (r < 0) { rows.push(0); r = rows.length - 1; }
      rows[r] = left + w;
      Object.assign(e, { _left: left, _w: w, _dur: dur, _row: r });
    }
    const h = LANE_PAD * 2 + rows.length * CARD_H + (rows.length - 1) * ROW_GAP;
    return { ...k, items, h };
  });

  // ── cards ────────────────────────────────────────────────────────────────
  const dateLine = (e) => e.type === 'span' ? `${fmt(e.start)} — ${e.end ? fmt(e.end) : 'NOW'}` : fmt(e.start);
  const tags = (e) => [
    ...e.forged.map((c) => `<span class="jt jt-f" data-c="${c}" title="Forged here">${esc(claims[c].label)}</span>`),
    ...e.sharpened.map((c) => `<span class="jt" data-c="${c}" title="Sharpened here">${esc(claims[c].label)}</span>`)
  ].join('');
  const card = (e) => {
    const s = [...e.forged, ...e.sharpened].join(' ');
    const top = LANE_PAD + e._row * (CARD_H + ROW_GAP);
    const cls = ['it', `it-${e.type}`, e.planned ? 'it-planned' : '', e.forged.length ? 'has-f' : ''].filter(Boolean).join(' ');
    const bar = e.type === 'span' ? `<span class="it-bar" style="width:${e._dur}px" aria-hidden="true"></span>` : '<span class="it-pt" aria-hidden="true"></span>';
    return `<article class="${cls}" id="j-${e.id}" data-k="${e.kind}" data-s="${s}" data-f="${e.forged.join(' ')}" data-x="${e._left}" tabindex="0" aria-label="${esc(`${e.title}, ${e.org}, ${dateLine(e).replace('—', 'to')}`)}" style="left:${e._left}px;top:${top}px;width:${e._w}px">`
      + `<div class="it-d">${dateLine(e)}${e.planned ? ' · PLANNED' : ''}</div>`
      + `<h4 class="it-t">${esc(e.title)}</h4><div class="it-o">${esc(e.org)}</div>`
      + `<div class="it-tags">${tags(e)}</div>${bar}</article>`;
  };

  // ── axis, now, future ────────────────────────────────────────────────────
  const years = [];
  for (let y = Math.ceil(t0); y < t1; y++) years.push(`<span class="ax-y" style="left:${X(y)}px">${y}</span>`);
  const nowX = X(tNow);
  const totalH = lanes.reduce((a, l) => a + l.h, 0);

  // ── controls (radios/checkboxes live at the top of .jr so :has() can see both sections) ──
  const inputs = [
    ...KINDS.map((k) => `<input type="checkbox" class="jr-in" id="jk-${k.id}" checked>`),
    `<input type="radio" class="jr-in" name="jr-claim" id="jc-none" checked>`,
    ...J.claims.map((c) => `<input type="radio" class="jr-in" name="jr-claim" id="jc-${c.id}">`)
  ].join('');
  const kindChips = KINDS.map((k) => `<label class="chip chip-k" for="jk-${k.id}" data-k="${k.id}"><span class="sw" aria-hidden="true"></span>${k.label}</label>`).join('');
  const claimChips = [`<label class="chip" for="jc-none">All</label>`, ...J.claims.map((c) => `<label class="chip" for="jc-${c.id}">${esc(c.label)}</label>`)].join('');

  // ── receipts ─────────────────────────────────────────────────────────────
  const firstOf = (cid) => {
    const f = J.entries.filter((e) => e.forged.includes(cid)).sort((a, b) => ym(a.start) - ym(b.start))[0];
    return f || J.entries.filter((e) => e.sharpened.includes(cid)).sort((a, b) => ym(a.start) - ym(b.start))[0];
  };
  const headline = J.claims.filter((c) => c.receipt);
  const receiptCards = headline.map((c, i) => {
    const first = firstOf(c.id);
    const rows = (J.receipts[c.id] || []).map((r) => {
      const e = byId[r.entry];
      const yr = e.start.slice(0, 4) + (e.type === 'span' && e.end && e.end.slice(0, 4) !== e.start.slice(0, 4) ? '–' + e.end.slice(2, 4) : '');
      const name = e.type === 'event' ? e.title : (e.short || e.org);
      const org = e.link ? `<a href="${e.link}">${esc(name)}</a>` : esc(name);
      return `<li><span class="rc-y">${yr}</span><span><b>${org}</b> — ${esc(r.text)}</span></li>`;
    }).join('');
    return `<div class="rc" data-c="${c.id}"><div class="rc-n">CLAIM ${String(i + 1).padStart(2, '0')}</div>`
      + `<h3>${esc(c.headline)}</h3><p class="rc-l">${esc(c.long)}</p>`
      + `<div class="rc-since">SINCE ${first.start.slice(0, 4)} · FIRST: ${esc((first.type === 'event' ? first.title : (first.short || first.org)).toUpperCase())}</div>`
      + `<ul>${rows}</ul><a class="rc-trace" href="research.html#trace-${c.id}">Trace on the timeline →</a></div>`;
  }).join('');

  // ── the list view (no-JS, print, screen readers) ─────────────────────────
  const listView = [...J.entries].sort((a, b) => ym(a.start) - ym(b.start)).map((e) => {
    const w = (e.with || []).map(person).filter(Boolean).map((p) => p.url ? `<a href="${p.url}">${esc(p.name)}</a>` : esc(p.name));
    return `<li><span class="rc-y">${dateLine(e)}</span><span><b>${esc(e.title)}</b> · ${esc(e.org)}. ${esc(e.blurb)}${w.length ? ` <i>With ${w.join(', ')}.</i>` : ''}</span></li>`;
  }).join('');

  // data for the detail panel (site.js)
  const detail = Object.fromEntries(J.entries.map((e) => [e.id, {
    d: dateLine(e), t: e.title, o: e.org, b: e.blurb, l: e.link || null,
    w: (e.with || []).map(person).filter(Boolean).map((p) => p.name),
    f: e.forged.map((c) => claims[c].label), s: e.sharpened.map((c) => claims[c].label)
  }]));
  const claimLabels = Object.fromEntries(J.claims.map((c) => [c.id, c.label]));

  const receipts = `
<div class="jr jr-rc">
<section class="jr-sec" id="receipts" aria-labelledby="rc-h">
  <div class="jr-wrap">
    <div class="jr-eyebrow">THE TITLE, ITEMIZED</div>
    <h2 id="rc-h">Every word of the headline, with receipts.</h2>
    <p class="jr-lede">“Full-Stack HCI Researcher · ML · AR/VR · Privacy · Human-Centered AI” makes six claims. Each card shows where the claim was first earned and the work that backs it.</p>
    <div class="rc-insight"><b>Read across the cards:</b> the privacy work started at Intel in 2016, three years before the PhD. The experience runs from silicon (RIT, Intel) through hardware perception (Apple) and interaction research (Adobe, Virginia Tech) to the people in the studies (up to N=206).</div>
    <div class="rc-grid">${receiptCards}</div>
    <div class="rc-cv"><a href="assets/Cory_Ilo_CV.pdf" target="_blank" rel="noopener">Download the CV (PDF) →</a><a href="research.html#journey">See the full journey on the Research page →</a></div>
  </div>
</section>
</div>`;

  const journey = `
<div class="jr" id="journey-wrap">${inputs}
<section class="jr-sec" id="journey" aria-labelledby="jr-h">
  <div class="jr-wrap">
    <div class="jr-eyebrow">JOURNEY · ${J.range.start.slice(0, 4)} → NOW → PLANNED</div>
    <h2 id="jr-h">Where each skill came from, and what's next.</h2>
    <p class="jr-lede">Drawn to scale. Pick a claim: <span class="lg lg-f">●&nbsp;first evidence</span>, <span class="lg">○&nbsp;added evidence</span>. The hatched area is planned work.</p>
    <div class="jr-bar">
      <div class="jr-row"><span class="jr-k">LANES</span>${kindChips}</div>
      <div class="jr-row"><span class="jr-k">CLAIM</span>${claimChips}</div>
    </div>
    <div class="jr-nav" hidden><button type="button" data-jr-step="-1" aria-label="Earlier">←</button><button type="button" data-jr-now>NOW</button><button type="button" data-jr-step="1" aria-label="Later">→</button></div>
  </div>
  <div class="jr-scroll" tabindex="0" role="group" aria-label="Journey timeline, ${J.range.start.slice(0, 4)} to ${J.range.end.slice(0, 4)}, scroll sideways">
    <div class="jr-track" style="width:${width + LABEL_W + 40}px">
      <div class="jr-axis" style="margin-left:${LABEL_W}px;width:${width}px">${years.join('')}</div>
      <div class="jr-body" style="margin-left:${LABEL_W}px;width:${width}px">
        <div class="jr-future" style="left:${nowX}px;width:${width - nowX}px" aria-hidden="true"></div>
        ${years.map((y) => `<span class="jr-grid" style="left:${y.match(/left:(\d+)/)[1]}px" aria-hidden="true"></span>`).join('')}
        ${lanes.map((l) => `<div class="lane" data-k="${l.id}" style="height:${l.h}px"><div class="lane-l" style="width:${LABEL_W}px;margin-left:-${LABEL_W}px">${l.label.toUpperCase()}</div>${l.items.map(card).join('')}</div>`).join('')}
        <div class="jr-now" style="left:${nowX}px" aria-hidden="true"><span>NOW</span></div>
        <svg class="jr-thread" width="${width}" aria-hidden="true"></svg>
      </div>
    </div>
  </div>
  <div class="jr-wrap">
    <div class="jr-detail" aria-live="polite" hidden></div>
    <details class="jr-list"><summary>Read the journey as a list</summary><ol>${listView}</ol></details>
  </div>
</section>
<script type="application/json" id="journey-data">${JSON.stringify({ detail, claims: claimLabels }).replace(/</g, '\\u003c')}</script>
</div>`;

  fs.writeFileSync(path.join(ROOT, 'assets/journey.css'), css(J.claims.map((c) => c.id)));
  return { receipts, journey };
}

function css(ids) {
  const per = ids.map((c) => [
    `.jr:has(#jc-${c}:checked) .it:not([data-s~="${c}"]){opacity:.16;filter:saturate(.3)}`,
    `.jr:has(#jc-${c}:checked) .it[data-s~="${c}"]{border-color:var(--j-violet-hi);opacity:1}`,
    `.jr:has(#jc-${c}:checked) .it[data-f~="${c}"]{border-color:var(--j-gold);box-shadow:0 0 0 1px var(--j-gold),0 0 28px oklch(80% 0.16 85/0.25)}`,
    `.jr:has(#jc-${c}:checked) .it[data-f~="${c}"]::after{content:"● FIRST"}`,
    `.jr:has(#jc-${c}:checked) .it[data-s~="${c}"]:not([data-f~="${c}"])::after{content:"○ ADDED";color:var(--j-violet-text)}`,
    `.jr:has(#jc-${c}:checked) .jt[data-c="${c}"]{background:oklch(58% 0.26 300/0.3);color:var(--j-strong)}`,
    `.jr:has(#jc-${c}:checked) label[for="jc-${c}"].chip{background:oklch(58% 0.26 300/0.18);border-color:oklch(67% 0.22 300/0.6);color:var(--j-violet-text)}`,
    `.jr:has(#jc-${c}:checked) .rc[data-c="${c}"]{border-color:var(--j-gold)}`
  ].join('\n')).join('\n');
  return `/* journey.css — GENERATED by build/journey.mjs from data/journey.json. Edit the generator, not this file. */
.jr{--j-page:oklch(13% 0.02 300);--j-sunken:oklch(10% 0.015 300);--j-card:oklch(17% 0.025 300);--j-strong:oklch(98% 0.005 300);--j-body:oklch(92% 0.01 300);--j-muted:oklch(72% 0.02 300);--j-faint:oklch(52% 0.025 300);--j-violet:oklch(58% 0.26 300);--j-violet-hi:oklch(67% 0.22 300);--j-violet-text:oklch(76% 0.16 300);--j-emerald:oklch(80% 0.15 165);--j-gold:oklch(80% 0.16 85);--j-line:oklch(100% 0 0/0.08);--j-line2:oklch(100% 0 0/0.14);--k-academic:oklch(67% 0.22 300);--k-industry:oklch(72% 0.17 163);--k-guild:oklch(80% 0.16 85);color:var(--j-body);font-family:'Kameron',Georgia,serif}
.jr-in{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.jr-sec{padding:clamp(48px,7vw,80px) 0 clamp(24px,4vw,40px)}
#receipts{border-bottom:1px solid var(--j-line)}
.jr-wrap{max-width:1160px;margin:0 auto;padding:0 clamp(20px,5vw,40px)}
.jr-prompt{font-family:'Space Mono',monospace;font-size:11.5px;color:var(--j-faint);margin-bottom:16px;overflow-wrap:anywhere}
.jr-eyebrow{font-family:'Space Mono',monospace;font-weight:700;font-size:12px;letter-spacing:.22em;color:var(--j-violet-text)}
.jr h2{margin:14px 0 0;font-family:'Montserrat',sans-serif;font-weight:800;font-size:clamp(28px,3.2vw,40px);line-height:1.1;color:var(--j-strong);max-width:820px}
.jr-lede{margin:16px 0 0;max-width:720px;font-size:16.5px;line-height:1.6;color:var(--j-muted)}
.rc-insight{margin-top:24px;max-width:860px;padding:16px 20px;border-left:2px solid var(--j-gold);background:oklch(80% 0.16 85/0.06);font-size:15.5px;line-height:1.6;color:var(--j-body)}
.rc-insight b{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.14em;color:var(--j-gold);text-transform:uppercase;margin-right:6px}
.rc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;margin-top:28px}
.rc{background:var(--j-card);border:1px solid var(--j-line);border-radius:10px;padding:22px 22px 18px;display:flex;flex-direction:column;gap:10px;transition:border-color .2s}
.rc-n{font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.16em;color:var(--j-faint)}
.rc h3{margin:0;font-family:'Montserrat',sans-serif;font-weight:800;font-size:22px;color:var(--j-strong)}
.rc-l{margin:0;font-size:14.5px;color:var(--j-muted)}
.rc-since{font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:var(--j-emerald)}
.rc ul,.jr-list ol{margin:4px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px}
.rc li,.jr-list li{display:grid;grid-template-columns:62px 1fr;gap:10px;font-size:14px;line-height:1.5;color:var(--j-muted)}
.jr-list li{grid-template-columns:170px 1fr}
.rc li b,.jr-list li b{color:var(--j-body);font-weight:600}
.rc-y{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--j-violet-text);padding-top:2px}
.rc-trace{margin-top:auto;padding-top:8px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.14em;color:var(--j-violet-text);cursor:pointer}
.rc-trace:hover{color:var(--j-gold)}
.rc-cv{margin-top:28px;display:flex;gap:28px;flex-wrap:wrap;font-family:'Space Mono',monospace;font-size:12px;letter-spacing:.12em}
.jr-rc .jr-sec{padding-top:clamp(40px,6vw,64px)}
#journey{border-top:1px solid var(--j-line)}
.jr a{color:var(--j-violet-text);text-decoration:none}.jr a:hover{color:var(--j-gold)}
.jr-bar{margin-top:24px;display:flex;flex-direction:column;gap:10px}
.jr-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.jr-k{width:56px;font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.16em;color:var(--j-faint)}
.chip{display:inline-flex;align-items:center;gap:7px;height:30px;padding:0 13px;border-radius:999px;border:1px solid var(--j-line2);font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.1em;color:var(--j-muted);cursor:pointer;user-select:none;transition:background .15s,border-color .15s,color .15s}
.chip:hover{color:var(--j-strong);border-color:oklch(100% 0 0/0.24)}
.jr-in:focus-visible + .jr-in, .jr:has(.jr-in:focus-visible) .chip:hover{outline:none}
.sw{width:8px;height:8px;border-radius:2px;background:currentColor}
.chip-k[data-k=academic] .sw{background:var(--k-academic)}.chip-k[data-k=industry] .sw{background:var(--k-industry)}.chip-k[data-k=guild] .sw{background:var(--k-guild)}
${['academic', 'industry', 'guild'].map((k) => `.jr:has(#jk-${k}:checked) label[for="jk-${k}"]{color:var(--j-strong);border-color:oklch(100% 0 0/0.3)}\n.jr:has(#jk-${k}:not(:checked)) label[for="jk-${k}"]{opacity:.5;text-decoration:line-through}\n.jr:has(#jk-${k}:not(:checked)) .lane[data-k=${k}]{display:none}`).join('\n')}
.jr:has(#jc-none:checked) label[for="jc-none"]{background:oklch(58% 0.26 300/0.18);border-color:oklch(67% 0.22 300/0.6);color:var(--j-violet-text)}
.jr:has(.jr-in:focus-visible) .jr-bar{outline:1px dashed var(--j-violet-hi);outline-offset:6px}
.jr-nav{margin-top:14px;display:flex;gap:8px;justify-content:flex-end}
.jr-nav[hidden]{display:none}
.jr-nav button{height:32px;min-width:40px;padding:0 12px;border-radius:6px;border:1px solid var(--j-line2);background:transparent;color:var(--j-muted);font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.14em;cursor:pointer}
.jr-nav button:hover{color:var(--j-strong);border-color:oklch(100% 0 0/0.3)}
.jr-scroll{margin-top:18px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scrollbar-width:thin;scrollbar-color:oklch(67% 0.22 300/0.5) transparent;border-top:1px solid var(--j-line);border-bottom:1px solid var(--j-line);background:var(--j-sunken);-webkit-mask-image:linear-gradient(90deg,#000 0,#000 calc(100% - 48px),transparent);mask-image:linear-gradient(90deg,#000 0,#000 calc(100% - 48px),transparent)}
.jr-scroll:focus-visible{outline:1px solid var(--j-violet-hi);outline-offset:-1px}
.jr-track{position:relative;padding:0 0 18px}
.jr-axis{position:relative;height:34px;border-bottom:1px solid var(--j-line)}
.ax-y{position:absolute;top:12px;transform:translateX(4px);font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.12em;color:var(--j-faint)}
.jr-body{position:relative}
.jr-grid{position:absolute;top:0;bottom:0;width:1px;background:var(--j-line)}
.jr-future{position:absolute;top:0;bottom:0;background:repeating-linear-gradient(135deg,oklch(80% 0.16 85/0.05) 0 6px,transparent 6px 14px)}
.jr-now{position:absolute;top:-34px;bottom:0;width:0;border-left:1px dashed var(--j-gold);z-index:1;pointer-events:none}
.jr-now span{position:absolute;top:8px;right:6px;font-family:'Space Mono',monospace;font-weight:700;font-size:10.5px;letter-spacing:.16em;color:var(--j-gold);background:var(--j-sunken);padding:0 4px}
.lane{position:relative;border-bottom:1px solid var(--j-line)}
.lane-l{position:sticky;left:0;float:left;height:100%;display:flex;align-items:flex-start;padding-top:18px;padding-left:clamp(12px,3vw,24px);font-family:'Space Mono',monospace;font-weight:700;font-size:10.5px;letter-spacing:.18em;color:var(--j-faint);background:linear-gradient(90deg,var(--j-sunken) 72%,transparent);z-index:4}
.lane[data-k=academic] .lane-l{color:var(--k-academic)}.lane[data-k=industry] .lane-l{color:var(--k-industry)}.lane[data-k=guild] .lane-l{color:var(--k-guild)}
.it{position:absolute;height:${CARD_H}px;box-sizing:border-box;padding:10px 12px 14px;background:var(--j-card);border:1px solid var(--j-line);border-top:2px solid var(--kc);border-radius:6px;overflow:hidden;cursor:pointer;transition:opacity .2s,border-color .2s,box-shadow .2s,filter .2s;z-index:2}
.it[data-k=academic]{--kc:var(--k-academic)}.it[data-k=industry]{--kc:var(--k-industry)}.it[data-k=guild]{--kc:var(--k-guild)}
.it:hover,.it:focus-visible{border-color:var(--j-violet-hi);outline:none;z-index:5}
.it.is-open{box-shadow:0 0 0 1px var(--j-violet-hi);z-index:5}
.it-planned{background:transparent;border-style:dashed;border-top-style:dashed}
.it-d{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;color:var(--j-faint);white-space:nowrap}
.it-t{margin:4px 0 0;font-family:'Montserrat',sans-serif;font-weight:700;font-size:13.5px;line-height:1.25;color:var(--j-strong);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.it-o{margin-top:2px;font-size:12.5px;color:var(--j-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.it-tags{margin-top:6px;display:flex;gap:4px;flex-wrap:nowrap;overflow:hidden}
.jt{flex:none;font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.06em;padding:2px 6px;border-radius:3px;border:1px solid var(--j-line2);color:var(--j-faint);white-space:nowrap}
.jt-f{border-color:oklch(80% 0.16 85/0.45);color:var(--j-gold)}
.it-bar{position:absolute;left:0;bottom:0;height:3px;background:var(--kc);opacity:.75}
.it-pt{position:absolute;left:-1px;bottom:-1px;width:9px;height:9px;background:var(--kc);transform:rotate(45deg) translate(2px,2px)}
.it::after{position:absolute;top:9px;right:10px;font-family:'Space Mono',monospace;font-weight:700;font-size:9.5px;letter-spacing:.12em;color:var(--j-gold);background:var(--j-card);padding-left:4px}
.jr-thread{position:absolute;left:0;top:0;height:100%;pointer-events:none;z-index:1;overflow:visible}
.jr-thread path{fill:none;stroke:var(--j-gold);stroke-width:1.5;stroke-dasharray:4 4;opacity:.8}
.jr-thread circle{fill:var(--j-gold)}
.jr-detail{margin-top:18px;padding:18px 20px;border:1px solid var(--j-line2);border-radius:8px;background:var(--j-card);display:grid;gap:6px}
.jr-detail[hidden]{display:none}
.jr-detail .dd{font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:var(--j-faint)}
.jr-detail h4{margin:0;font-family:'Montserrat',sans-serif;font-weight:800;font-size:19px;color:var(--j-strong)}
.jr-detail p{margin:0;font-size:15px;line-height:1.6;color:var(--j-muted)}
.jr-detail .dt{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.1em;color:var(--j-emerald)}
.jr-list{margin-top:18px}
.jr-list summary{cursor:pointer;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.16em;color:var(--j-violet-text)}
.jr-list ol{margin-top:14px}
.lg{font-family:'Space Mono',monospace;font-size:12px;color:var(--j-violet-text)}.lg-f{color:var(--j-gold)}
@media (max-width:640px){.lane-l{width:34px!important;margin-left:-34px!important;padding-left:8px;writing-mode:vertical-rl;transform:rotate(180deg);justify-content:center}.jr-list li{grid-template-columns:1fr}.rc-grid{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.it,.rc,.chip{transition:none}}
@media print{.jr-scroll,.jr-bar,.jr-nav,.jr-detail,.rc-trace{display:none}.jr-list{display:block}.jr-list[open] summary,.jr-list summary{display:none}}
${per}
`;
}
