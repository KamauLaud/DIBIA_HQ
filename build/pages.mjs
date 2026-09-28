// Per-page metadata: <title>, description, canonical path, JSON-LD type. Keep titles keyworded (what a search result shows).
export const pages = {
  index: {
    title: 'Cory “Ike” Ilo, PhD — XR Privacy, Gaze & Context-Aware AR · DIBIA',
    description: 'Cory “Ike” Ilo (PhD, Virginia Tech ’26) engineers privacy into context-aware XR — gaze as passive context, representational veiling, and human-in-the-loop privacy assistants. Founder of DIBIA, an independent research village.',
    type: 'ProfilePage'
  },
  research: {
    title: 'Research — Impondo Zenkomo · Cory “Ike” Ilo, PhD',
    description: 'Three studies, one decision tree: GoldiLocks Zoning (ACM SUI ’24), Hidden in Plain Gaze (manuscript), and Privacy on Autopilot / ARPA (IEEE ISMAR ’26). The dissertation, publications, talks, and the 2027 build plan.',
    type: 'CollectionPage'
  },
  cv: { title: 'CV — Cory “Ike” Ilo, PhD', description: 'Curriculum vitae of Cory “Ike” Ilo — Virginia Tech, Apple, Adobe Research, Intel, RIT. Download as PDF.', type: 'WebPage' },
  org: { title: 'The Org — DIBIA, an independent research village', description: 'DIBIA: consultancy, marketplace, incubator. Three-person research cells, ranks, the founding fellowship of #Tech4Gud, and the stack.', type: 'AboutPage' },
  marketplace: { title: 'Marketplace — DIBIA · odd tech jobs, research-grade', description: 'Research-oriented developers for hire. Missions matched to cells, trust as currency. Coming soon.', type: 'WebPage' },
  contact: { title: 'Contact — Cory “Ike” Ilo · DIBIA consultancy', description: 'Book an XR privacy, gaze systems, or human-AI collaboration engagement with Dr. Cory “Ike” Ilo.', type: 'ContactPage' },
  'paper-arpa': { title: 'Privacy on Autopilot (IEEE ISMAR ’26) — XR assistant autonomy and privacy awareness', description: 'ARPA, an AR privacy assistant with three autonomy levels, evaluated in a within-subjects study (N=30). Automation redistributes the privacy burden rather than removing it. IEEE ISMAR 2026, Bari.', type: 'ScholarlyArticle' },
  'paper-goldilocks': { title: 'GoldiLocks Zoning (ACM SUI ’24) — gaze-aware VR notification placement', description: 'Gaze alone, read as passive context, drives task-agnostic VR notification placement without imaging the environment. ACM Symposium on Spatial User Interaction 2024.', type: 'ScholarlyArticle' },
  'paper-inplaingaze': { title: 'Hidden in Plain Gaze — gaze representations as privacy controls (manuscript, 2026)', description: 'Gaze representation is a privacy lever: engineered features keep ~85% of task utility while cutting re-identification by an order of magnitude across 206 identities (HoloAssist).', type: 'WebPage' }
};
