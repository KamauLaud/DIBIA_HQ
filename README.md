# Dr. Cory “Ike” Ilo — DIBIA · site

Static site, zero runtime dependencies. What GitHub Pages serves is the set of `*.html` files at the repo root plus `assets/` and `_ds/`. Those HTML files are **generated** — edit the sources, run the build, commit both.

```
data/            ← the record: publications.json · news.json · talks.json · people.json · site.json
src/             ← page templates (dc-runtime format, with <!-- @@marker --> slots) + the runtime used only at build time
build/           ← render.mjs (JSON → cards) · build.mjs (headless hydrate + strip runtime) · og.mjs · check.mjs · pages.mjs (titles/descriptions)
assets/          ← photos (≤1600px JPEG), paper figures (WebP), fonts, site.js (~2 KB), og-card.png, brand/ (DIBIA Netrunners emblem, nav mark, icons), ilo.bib + bib/<id>.bib
_ds/             ← DIBIA / #Tech4Gud design system (tokens + self-hosted fonts)
*.html           ← BUILD OUTPUT — do not hand-edit
```

## Everyday updates (no code)

| You want to… | Edit | Then |
|---|---|---|
| Announce something (news, talk, acceptance) | `data/news.json` — add an entry at the top; `"public": true` | `npm run build` |
| Add / change a paper or its status | `data/publications.json` — `status`, `statusLabel`, `links.{pdf,doi,arxiv,video,code}` | `npm run build` |
| Add a talk or award | `data/talks.json` (`talks`, `recognition`) | `npm run build` |
| Link a co-author or guild member | `data/people.json` — set `url` | `npm run build` |
| Change emails (`email` = primary, `emailAcademic` = academic) / social links / thesis line | `data/site.json` | `npm run build && npm run og` |
| Change page titles / descriptions | `build/pages.mjs` | `npm run build` |
| Change layout or copy | `src/<page>.html` | `npm run build` |

Anything with `"public": false` stays off every page — but `data/*.json` is public (repo and Pages), so keep unconfirmed entries in a gitignored `data/*.local.json` until they are ready. Anything with a `verify` note is listed in the build log under **Content flags** — the page never shows the note.

## Build

```bash
npm run setup        # once: installs deps + a Playwright Chromium
npm run all          # build → og card → checks (screenshots land in .tmp/shots/)
npm run serve        # preview at http://localhost:8080
```

`build.mjs` fills the JSON into the templates, loads each page once in headless Chromium **with React/Babel served from node_modules (never a CDN)**, waits for hydration, deletes every script, and writes the hydrated DOM as plain HTML with `<title>`, meta description, canonical, Open Graph / Twitter cards and JSON-LD (`Person`, `WebSite`, page type, `ScholarlyArticle`s). The published pages run only `assets/site.js` (portrait feed cycling, “show earlier”, on-screen video play/pause).

`check.mjs` fails the build if any page makes an external request, logs an error, leaves an unrendered `{{ }}`, is missing the hover stylesheet or JSON-LD, or links to a file that doesn't exist.

## Publish

Pages must serve the repo root. Either enable **Settings → Pages → Deploy from a branch → `main` / (root)** on this repo (enabled once after the first push); the site is at `https://kamaulaud.github.io/DIBIA_HQ/` (the path is case-sensitive, and `data/site.json` `baseUrl` must match it). Or push the same tree to `KamauLaud/KamauLaud.github.io` for `kamaulaud.github.io` and change `baseUrl`. Keep `.nojekyll` (Jekyll would drop `_ds/`).

## Decisions of record reflected here

- The brand renders as “DIBIA” everywhere — no entity suffix.
- The record is data-driven and honest about status: `ACCEPTED · TO APPEAR`, `UNDER REVIEW`, `IN SUBMISSION`, `MANUSCRIPT`, `PREPRINT`, `PUBLISHED`, `DEFENDED`.
- Every co-author can carry a link (`people.json`); the self-author is bold. Distribute credit.
- Content never depends on JavaScript. Motion respects `prefers-reduced-motion`.
