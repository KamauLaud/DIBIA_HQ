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
 *   rank        Genin | Chunin | Jonin | Special | Anbu | Kage   (see org.html "The Ladder";
 *               shown on the Dossier as Apprentice | Engineer | Lead | Specialist | Security | Principal)
 *   track       Academic | Industry | Both
 *   cell        the specialty cell you anchor or sit in
 *   headline    one line, outcome-first: what a startup gets from you
 *   jobs        service ids you offer, from `services` below. The Marketplace page lists
 *               every service at least one member offers, with who offers it.
 *   skills      short tags, 3-8
 *   proof       2-4 bullets of verifiable receipts (papers, awards, shipped systems, scale)
 *   pedigree    orgs / institutions, optional
 *   photo       path under assets/photos/, optional (square-ish crop, >= 600px)
 *   links       { label: url } — portfolio, CV, scholar, GitHub, LinkedIn
 *   available   true | false — taking new missions this quarter
 *   founder     true for DIBIA co-founders (shown on org.html)
 *   draft       true while the profile is unreviewed; renders a DRAFT badge
 */
window.DIBIA_DOSSIER = {
  // Where mission briefs land. One inbox, triaged within 48h.
  intakeEmail: "machine@reetche.com",
  // n8n webhook that emails the brief (workflow "DIBIA Dossier · Mission brief intake" on reetche.app.n8n.cloud).
  // Leave empty to fall back to opening the visitor's email app.
  briefEndpoint: "https://reetche.app.n8n.cloud/webhook/dossier-brief",

  // Service catalog. A service appears on the Marketplace only while at least one member lists it in `jobs`.
  // id: stable key (used in mission briefs) · title: what the client gets · short: filter chip label
  services: [
    { id: "SVC_PROTOTYPE",  title: "XR / AR prototype or demo",                    short: "XR PROTOTYPE" },
    { id: "SVC_SENSING",    title: "Eye-tracking and sensing system design",        short: "SENSING" },
    { id: "SVC_ML",         title: "Machine learning on behavioral and sensor data", short: "ML" },
    { id: "SVC_PRIVACY",    title: "Privacy review of an app or data pipeline",     short: "PRIVACY" },
    { id: "SVC_STUDY",      title: "User study: design, run, and analysis",         short: "USER RESEARCH" },
    { id: "SVC_ADVISORY",   title: "Technical advisory and expert review",          short: "ADVISORY" },
    { id: "SVC_LLM",        title: "LLM integration into a product or workflow",    short: "LLM" },
    { id: "SVC_AGENTS",     title: "AI agent workflows with evaluations",           short: "AGENTS" },
    { id: "SVC_AUTOMATION", title: "Workflow and business-process automation",      short: "AUTOMATION" },
    { id: "SVC_DATA",       title: "Data pipeline and dashboard",                   short: "DATA" },
    { id: "SVC_INFRA",      title: "Cloud and GPU infrastructure",                  short: "CLOUD / GPU" },
    { id: "SVC_SECURITY",   title: "Infrastructure security hardening",            short: "SECURITY" }
  ],

  members: [
    {
      id: "cory-ilo",
      name: "Dr. Cory “Ike” Ilo",
      alias: "KRYPTOKAGE",
      rank: "Kage",
      track: "Both",
      cell: "XR Privacy & Intelligent Systems",
      headline: "Privacy-first XR and gaze-aware systems, from use case down to hardware spec, proven in instrumented user studies.",
      jobs: ["SVC_PROTOTYPE", "SVC_SENSING", "SVC_ML", "SVC_PRIVACY", "SVC_STUDY", "SVC_ADVISORY"],
      skills: ["XR / AR / VR", "Eye tracking", "Privacy engineering", "Human-centered AI", "User studies", "ML"],
      proof: [
        "PhD, Virginia Tech ’26: gaze, privacy and context-aware adaptation in XR",
        "1st place, IEEE VR 2022 3DUI Contest · GEM Fellow",
        "Publications at ACM SUI 2024 and IEEE ISMAR 2026; workshop poster at XRSecurity 2026 (ACM MobiCom)",
        "Instrumented user studies up to N=206"
      ],
      pedigree: ["Virginia Tech", "Apple", "Adobe", "Intel", "RIT"],
      photo: "assets/photos/cory-suit-1.jpg",
      links: { "CV": "assets/Cory_Ilo_CV.pdf", "Research": "research.html" },
      available: true,
      founder: true,
      draft: false
    },
    {
      id: "michael",
      name: "Michael Robles",
      alias: "TECHNOKAGE",
      rank: "Kage",
      track: "Industry",
      cell: "Applied AI & Automation",
      headline: "Production LLM integrations, agent workflows and the automation that removes the busywork, shipped on hardened infrastructure.",
      jobs: ["SVC_LLM", "SVC_AGENTS", "SVC_AUTOMATION", "SVC_DATA", "SVC_INFRA", "SVC_SECURITY"],
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
      founder: true,
      draft: true
    }
  ]
};
