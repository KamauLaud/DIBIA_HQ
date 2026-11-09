/*
 * DIBIA DOSSIER — operative data.
 * One object per operative. Add yourself by PR (see dossier/README.md) or via the
 * "Dossier profile" issue form. Keep every claim verifiable: no client names you
 * can't share, no metrics you can't back up.
 *
 * Fields
 *   id          slug, unique (used for #anchors and the "request this operative" button)
 *   name        display name
 *   alias       optional handle / call-sign
 *   rank        Genin | Chunin | Jonin | Special | Anbu | Kage   (see org.html "The Ladder")
 *   track       Academic | Industry | Both
 *   cell        the specialty cell you anchor or sit in
 *   headline    one line, outcome-first: what a startup gets from you
 *   jobs        board jobs you take: JOB_01..JOB_06 (see marketplace.html)
 *   skills      short tags, 3-8
 *   proof       2-4 bullets of verifiable receipts (papers, awards, shipped systems, scale)
 *   pedigree    orgs / institutions, optional
 *   photo       path under assets/photos/, optional (square-ish crop, >= 600px)
 *   links       { label: url } — portfolio, CV, scholar, GitHub, LinkedIn
 *   available   true | false — taking new missions this quarter
 *   draft       true while the profile is unreviewed; renders a DRAFT badge
 */
window.DIBIA_DOSSIER = {
  // Where mission briefs land. One inbox, triaged within 48h.
  intakeEmail: "machine@reetche.com",
  // n8n webhook that emails the brief (workflow "DIBIA Dossier · Mission brief intake" on reetche.app.n8n.cloud).
  // Leave empty to fall back to opening the visitor's email app.
  briefEndpoint: "https://reetche.app.n8n.cloud/webhook/dossier-brief",

  members: [
    {
      id: "cory-ilo",
      name: "Dr. Cory “Ike” Ilo",
      alias: "KRYPTOKAGE",
      rank: "Kage",
      track: "Both",
      cell: "XR Privacy & Intelligent Systems",
      headline: "Privacy-first XR and gaze-aware systems, from use case down to hardware spec, proven in instrumented user studies.",
      jobs: ["JOB_01", "JOB_04", "JOB_06"],
      skills: ["XR / AR / VR", "Eye tracking", "Privacy engineering", "Human-centered AI", "User studies", "ML"],
      proof: [
        "PhD, Virginia Tech ’26: gaze, privacy and context-aware adaptation in XR",
        "1st place, IEEE VR 2022 3DUI Contest · GEM Fellow",
        "Publications at ACM SUI 2024; IEEE ISMAR ’26 (cond. accepted); ACM VRST ’26 (under review)",
        "Instrumented user studies up to N=206"
      ],
      pedigree: ["Virginia Tech", "Apple", "Adobe", "Intel", "RIT"],
      photo: "assets/photos/cory-suit-1.jpg",
      links: { "CV": "cv.html", "Research": "research.html" },
      available: true,
      draft: false
    },
    {
      id: "michael",
      name: "Michael",
      alias: "TECHNOKAGE",
      rank: "Kage",
      track: "Industry",
      cell: "Applied AI & Automation",
      headline: "Production LLM integrations, agent workflows and the automation that removes the busywork, shipped on hardened infrastructure.",
      jobs: ["JOB_02", "JOB_05", "JOB_03"],
      skills: ["LLM integration", "AI agents", "Evals", "Automation", "Data pipelines", "Cloud & GPU infra", "Security"],
      proof: [
        "Principal AI Engineer; founder of Reetche AI Integration Consultancy",
        "~12 years of infrastructure and engineering experience",
        "Enterprise GenAI consulting delivered under contract"
      ],
      pedigree: ["Netflix", "The New York Times", "Bilt Rewards", "Johnson & Johnson", "NYU"],
      photo: "assets/photos/michael.jpg",
      links: { "Reetche": "https://www.reetche.com/", "LinkedIn": "https://www.linkedin.com/in/devmichaelrobles/" },
      available: true,
      draft: true
    }
  ]
};
