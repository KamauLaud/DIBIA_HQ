# The DIBIA Dossier: adding your profile

The Dossier (`dossier.html`) is DIBIA's lookbook for startups and businesses. Each card is one operative. Clients browse, pick a job type or an operative, and send a mission brief. A cell answers.

## Two ways to get listed

1. **Pull request (preferred).** Copy the template below into the `members` array in `dossier/members.js`, fill it in, add your photo to `assets/photos/`, and open a PR.
2. **Issue form.** No git? Open a new issue on this repo and choose **Dossier profile**. A maintainer turns it into a card.

New profiles ship with `draft: true`. A Jonin or Kage reviews, then flips it to `false`.

## Template

```js
{
  id: "first-last",                 // unique slug
  name: "First Last",
  alias: "",                        // optional call-sign
  rank: "Chunin",                   // Genin | Chunin | Jonin | Special | Anbu | Kage
  track: "Industry",                // Academic | Industry | Both
  cell: "Your specialty cell",
  headline: "One line: what a startup gets from you, outcome first.",
  jobs: ["JOB_02"],                 // JOB_01..JOB_06 from marketplace.html
  skills: ["Skill", "Skill", "Skill"],
  proof: [
    "Verifiable receipt: paper, award, shipped system, scale"
  ],
  pedigree: ["Org", "University"],
  photo: "assets/photos/first-last.jpg",
  links: { "Portfolio": "https://...", "LinkedIn": "https://..." },
  available: true,
  draft: true
}
```

Job codes: `JOB_01` prototype / XR · `JOB_02` LLM integration · `JOB_03` data pipeline · `JOB_04` privacy audit / red team · `JOB_05` automation · `JOB_06` user study.

## Writing rules

- **Outcome first.** "Ships production LLM integrations" beats "Passionate about AI".
- **Receipts only.** Every `proof` line should be checkable. Don't name a client unless they've agreed to it.
- **No personal contact info.** All requests route through the single intake inbox (`intakeEmail` in `members.js`), so nothing personal goes on the page.
- **Photo:** square-ish, at least 600px, face clearly visible, under 400 KB. Optional; initials render if absent.
- External links must be full `https://` URLs.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/dossier.html
```
