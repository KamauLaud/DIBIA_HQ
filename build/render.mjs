// render.mjs — data/*.json → HTML fragments, filled into src/*.html templates.
// Output: .tmp/<page>.html (dc templates with the @@ markers replaced), assets/ilo.bib, assets/bib/<id>.bib
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const json = (p) => JSON.parse(read(p));

export const site = json('data/site.json');
export const pubs = json('data/publications.json').publications;
export const newsData = json('data/news.json');
export const talksData = json('data/talks.json');
export const people = json('data/people.json').people;

const MONO = "font-family:'Space Mono',monospace";
const C = {
  text: 'oklch(98% 0.005 300)', body: 'oklch(72% 0.02 300)', dim: 'oklch(52% 0.025 300)',
  violet: 'oklch(76% 0.16 300)', gold: 'oklch(80% 0.16 85)', amber: 'oklch(78% 0.16 70)',
  cyan: 'oklch(76% 0.13 205)', green: 'oklch(80% 0.15 165)', red: 'oklch(63% 0.22 22)'
};
const STATUS_COLOR = { published: C.green, accepted: C.green, defended: C.green, 'under-review': C.amber, 'in-submission': C.amber, preprint: C.cyan };
const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
export const fmtDate = (d) => { const [y, m] = String(d).split('-'); return m ? `${MONTHS[+m - 1]} ${y}` : y; };
const fmtDateNum = (d) => { const [y, m] = String(d).split('-'); return m ? `${m}.${y}` : y; };

export const warnings = [];
const warn = (s) => warnings.push(s);

// ---------- authors ----------
function personFor(name) {
  const n = name.toLowerCase();
  return people.find((p) => p.match.some((m) => m.toLowerCase() === n));
}
export function renderAuthors(authors, { linkSelf = false } = {}) {
  return authors.map((a) => {
    const p = personFor(a);
    if (p?.self) return `<b style="color:${C.text};font-weight:600">${esc(a)}</b>`;
    if (p?.url) return `<a href="${p.url}" style="color:${C.body};border-bottom:1px dotted oklch(100% 0 0/0.3)" style-hover="color:${C.gold}">${esc(a)}</a>`;
    return esc(a);
  }).join(', ');
}

// ---------- links row ----------
function linksRow(p) {
  const L = p.links || {};
  const items = [];
  const a = (href, label, ext = false) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''} style="padding-bottom:3px;border-bottom:1px solid oklch(67% 0.22 300/0.5)">${label}</a>`;
  if (L.page) items.push(a(L.page, p.status === 'defended' ? 'THE DISSERTATION →' : 'THE STUDY →'));
  if (L.pdf) items.push(a(L.pdf, 'PDF'));
  if (L.doi) items.push(a(`https://doi.org/${L.doi}`, 'DOI', true));
  if (L.arxiv) items.push(a(`https://arxiv.org/abs/${L.arxiv}`, 'ARXIV', true));
  if (L.video) items.push(a(L.video, 'VIDEO', true));
  if (L.code) items.push(a(L.code, 'CODE', true));
  if (p.status !== 'defended') items.push(a(`assets/bib/${p.id}.bib`, 'BIBTEX'));
  if (!items.length) return '';
  return `<div style="margin-top:10px;display:flex;gap:18px;flex-wrap:wrap;${MONO};font-weight:700;font-size:10.5px;letter-spacing:0.16em">${items.join('')}</div>`;
}

// ---------- publication card (matches the July card markup) ----------
function pubCard(p) {
  const titleInner = p.links?.page
    ? `<a href="${p.links.page}" style="color:${C.text}" style-hover="color:${C.gold}">${esc(p.title)}</a>`
    : esc(p.title);
  const meta = [renderAuthors(p.authors), esc(p.venueShort || p.venue), p.note ? esc(p.note) : null].filter(Boolean).join(' · ');
  const award = p.award ? `<div style="margin-top:6px;${MONO};font-weight:700;font-size:10.5px;letter-spacing:0.16em;color:${C.gold}">★ ${esc(p.award).toUpperCase()}</div>` : '';
  return `      <div id="pub-${p.id}" style="display:flex;flex-wrap:wrap;gap:10px 24px;align-items:baseline;background:oklch(17% 0.025 300);border:1px solid oklch(100% 0 0/0.08);border-radius:10px;padding:22px 26px">
        <span style="flex:0 0 92px;${MONO};font-weight:700;font-size:12px;letter-spacing:0.14em;color:${p.group === 'degree' ? C.violet : C.gold}">${esc(p.badge)}</span>
        <div style="flex:1 1 240px;min-width:0">
          <div style="font-size:17px;line-height:1.45;color:${C.text}">${titleInner}</div>
          <div style="margin-top:6px;font-size:14.5px;line-height:1.5;color:${C.body}">${meta}</div>${award}
          ${linksRow(p)}
        </div>
        <span style="${MONO};font-size:10.5px;letter-spacing:0.14em;color:${STATUS_COLOR[p.status] || C.dim}">${esc(p.statusLabel || p.status.toUpperCase())}</span>
      </div>`;
}
const GROUP_LABEL = { forthcoming: 'FORTHCOMING, UNDER REVIEW &amp; MANUSCRIPTS', 'peer-reviewed': 'PEER-REVIEWED', degree: 'THE DEGREE' };
export function renderPublications() {
  const pub = pubs.filter((p) => p.public);
  pubs.filter((p) => !p.public).forEach((p) => warn(`publications: HIDDEN ${p.id} — ${p.verify || 'public:false'}`));
  pub.filter((p) => p.verify).forEach((p) => warn(`publications: VERIFY ${p.id} — ${p.verify}`));
  return ['forthcoming', 'peer-reviewed', 'degree'].map((g) => {
    const items = pub.filter((p) => p.group === g).sort((a, b) => (b.year || 0) - (a.year || 0));
    if (!items.length) return '';
    return `      <div style="${MONO};font-weight:700;font-size:11px;letter-spacing:0.22em;color:${C.dim};margin-top:10px">${GROUP_LABEL[g]}</div>\n${items.map(pubCard).join('\n')}`;
  }).join('\n');
}

// ---------- talks + recognition ----------
function talkCard(t) {
  const color = t.status === 'SCHEDULED' ? C.amber : C.green;
  const title = t.link ? `<a href="${t.link}" style="color:${C.text}" style-hover="color:${C.gold}">${esc(t.title)}</a>` : esc(t.title);
  return `      <div style="display:flex;flex-wrap:wrap;gap:10px 24px;align-items:baseline;background:oklch(17% 0.025 300);border:1px solid oklch(100% 0 0/0.08);border-radius:10px;padding:22px 26px">
        <span style="flex:0 0 92px;${MONO};font-weight:700;font-size:12px;letter-spacing:0.14em;color:${C.gold}">${fmtDateNum(t.date)}</span>
        <div style="flex:1 1 240px;min-width:0">
          <div style="font-size:17px;line-height:1.45;color:${C.text}">${title}</div>
          <div style="margin-top:6px;font-size:14.5px;color:${C.body}">${esc(t.venue)}</div>
        </div>
        <span style="${MONO};font-size:10.5px;letter-spacing:0.14em;color:${color}">${esc(t.status)}</span>
      </div>`;
}
export function renderTalks() {
  const ts = talksData.talks.filter((t) => t.public).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  talksData.talks.filter((t) => !t.public).forEach((t) => warn(`talks: HIDDEN ${t.title} — ${t.verify || ''}`));
  ts.filter((t) => t.verify).forEach((t) => warn(`talks: VERIFY ${t.title} — ${t.verify}`));
  return ts.map(talkCard).join('\n');
}
export function renderRecognition() {
  const rs = talksData.recognition.filter((r) => r.public);
  rs.filter((r) => r.verify).forEach((r) => warn(`recognition: VERIFY ${r.title} — ${r.verify}`));
  return rs.map((r) => `      <div style="display:flex;flex-wrap:wrap;gap:10px 24px;align-items:baseline;border:1px solid oklch(100% 0 0/0.08);border-radius:10px;padding:18px 26px">
        <span style="flex:0 0 92px;${MONO};font-weight:700;font-size:12px;letter-spacing:0.14em;color:${C.gold}">${esc(r.year || '—')}</span>
        <div style="flex:1 1 240px;min-width:0">
          <div style="font-size:16.5px;line-height:1.45;color:${C.text}">${esc(r.title)}</div>
          <div style="margin-top:5px;font-size:14px;color:${C.body}">${esc(r.detail || '')}</div>
        </div>
      </div>`).join('\n');
}

// ---------- news (Signal) ----------
export function renderNews() {
  const all = newsData.news.filter((n) => n.public).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  newsData.news.filter((n) => !n.public).forEach((n) => warn(`news: HIDDEN ${n.date} — ${n.verify || ''}`));
  all.filter((n) => n.verify).forEach((n) => warn(`news: VERIFY ${n.date} — ${n.verify}`));
  const k = newsData.collapseAfter || 6;
  return all.map((n, i) => {
    const more = i >= k;
    const date = n.upcoming ? `<span style="color:${C.green}">${fmtDate(n.date)} · NEXT</span>` : fmtDate(n.date);
    const arrow = n.link ? `<a href="${n.link}" aria-label="Open" style="${MONO};font-weight:700;font-size:12px;letter-spacing:0.18em;white-space:nowrap">→</a>` : '';
    return `      <div class="sig-row"${more ? ' data-more="true" hidden="hidden"' : ''} style="display:grid;grid-template-columns:minmax(96px,120px) 1fr auto;gap:8px 20px;align-items:baseline;padding:16px 0;border-bottom:1px solid oklch(100% 0 0/0.08)">
        <span style="${MONO};font-weight:700;font-size:11px;letter-spacing:0.16em;color:${C.gold}">${date}</span>
        <div style="font-size:16px;line-height:1.55;color:${C.body}">${n.text}</div>
        ${arrow}
      </div>`;
  }).join('\n');
}

// ---------- hero lines + pills ----------
export function renderRecordLine() {
  const parts = [];
  pubs.filter((p) => p.public && p.group === 'forthcoming' && p.status !== 'in-submission')
      .forEach((p) => parts.push(`${p.badge} (${(p.statusLabel || p.status).split(' ·')[0]})`));
  pubs.filter((p) => p.public && p.group === 'peer-reviewed' && p.trilogy).forEach((p) => parts.push(p.badge));
  pubs.filter((p) => p.public && p.award).forEach((p) => parts.push(p.award.toUpperCase()));
  return esc(parts.join(' · ')).toUpperCase().replace(/’/g, '’');
}
export function renderNextLine() {
  const n = newsData.news.find((x) => x.public && x.upcoming);
  if (!n) return 'THE 2027 BUILD YEAR — SPATIALSENSAI · DIGIDINAR · #THIRDPLACE';
  return esc(n.short || n.text.replace(/<[^>]+>/g, '')).toUpperCase();
}
export function renderContactPills() {
  const pill = (href, label, ext = false) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''} style="display:inline-flex;align-items:center;height:28px;padding:0 12px;border-radius:999px;border:1px solid oklch(100% 0 0/0.16);${MONO};font-weight:700;font-size:10.5px;letter-spacing:0.16em;color:${C.body}" style-hover="border-color:oklch(72% 0.17 163/0.6);color:${C.text}">${label}</a>`;
  const L = site.links;
  const out = [pill('cv.html', 'CV'), pill(`mailto:${site.email}`, 'EMAIL'), pill(L.scholar, 'SCHOLAR', true), pill(L.github, 'GITHUB', true), pill(L.linkedin, 'LINKEDIN', true)];
  if (L.orcid) out.push(pill(L.orcid, 'ORCID', true));
  return out.join('\n      ');
}
export function statusLine(id) {
  const p = pubs.find((x) => x.id === id);
  if (!p) { warn(`status marker: unknown id ${id}`); return ''; }
  return esc(p.cardLine || `${p.badge} · ${p.statusLabel || p.status}`).toUpperCase();
}

// ---------- BibTeX ----------
function bibKey(p) { const first = p.authors[0].split(' ').pop().replace(/[^A-Za-z]/g, ''); return `${first}${p.year || ''}${(p.title.split(/[\s:]/)[0] || '').replace(/[^A-Za-z]/g, '')}`; }
function bibAuthors(p) { return p.authors.map((a) => { const m = a.match(/^(.*)\s(\S+)$/); return m ? `${m[2]}, ${m[1]}` : a; }).join(' and '); }
export function renderBib(p) {
  const L = p.links || {};
  const f = [];
  const type = p.status === 'published' && p.venue.match(/^Proceedings|Proc\.|Conference|Workshops/) ? 'inproceedings' : (p.status === 'preprint' ? 'misc' : (p.status === 'published' ? 'article' : 'unpublished'));
  f.push(`  title     = {${p.title}}`, `  author    = {${bibAuthors(p)}}`, `  year      = {${p.year || ''}}`);
  if (type === 'inproceedings') f.push(`  booktitle = {${p.venue}}`);
  else if (type === 'misc') f.push(`  howpublished = {arXiv:${L.arxiv}}`);
  else f.push(`  note      = {${p.venueShort}}`);
  if (L.doi) f.push(`  doi       = {${L.doi}}`);
  if (L.arxiv) f.push(`  eprint    = {${L.arxiv}}`, `  archivePrefix = {arXiv}`);
  return `@${type}{${bibKey(p)},\n${f.join(',\n')}\n}\n`;
}

// ---------- fill templates ----------
const PAGES = ['index', 'research', 'cv', 'org', 'marketplace', 'contact', 'paper-arpa', 'paper-goldilocks', 'paper-inplaingaze'];
export function renderAll() {
  fs.mkdirSync(path.join(ROOT, '.tmp'), { recursive: true });
  fs.rmSync(path.join(ROOT, 'assets/bib'), { recursive: true, force: true });   // build-owned: drop bibs for renamed/hidden ids
  fs.mkdirSync(path.join(ROOT, 'assets/bib'), { recursive: true });
  const frag = {
    publications: renderPublications(), talks: renderTalks(), recognition: renderRecognition(), news: renderNews(),
    'record-line': renderRecordLine(), 'next-line': renderNextLine(), 'contact-pills': renderContactPills()
  };
  for (const page of PAGES) {
    let html = read(`src/${page}.html`);
    html = html.replace(/<!-- @@status:([\w-]+) -->/g, (_, id) => statusLine(id));
    html = html.replace(/<!-- @@([\w-]+) -->/g, (m, key) => { if (!(key in frag)) { warn(`unknown marker ${key} in ${page}`); return m; } return frag[key]; });
    html = html.replace(/\{\{SCHOLAR\}\}/g, site.links.scholar);
    fs.writeFileSync(path.join(ROOT, '.tmp', `${page}.html`), html);
  }
  // bib files
  const bibAll = pubs.filter((p) => p.public && p.status !== 'defended').map(renderBib);
  fs.writeFileSync(path.join(ROOT, 'assets/ilo.bib'), bibAll.join('\n'));
  pubs.filter((p) => p.public && p.status !== 'defended').forEach((p) => fs.writeFileSync(path.join(ROOT, 'assets/bib', `${p.id}.bib`), renderBib(p)));
  return PAGES;
}
