// Per-page metadata: <title>, description, canonical path, JSON-LD type. Keep titles keyworded (what a search result shows).
export const pages = {
  index: {
    title: 'Cory “Ike” Ilo, PhD — XR Privacy, Gaze & Context-Aware AR · DIBIA',
    description: 'Cory “Ike” Ilo (PhD, Virginia Tech ’26) engineers privacy into context-aware XR — gaze as passive context, representational veiling, and human-in-the-loop privacy assistants. Founder of DIBIA, an independent research village.',
    type: 'ProfilePage'
  },
  research: {
    title: 'Research — XR privacy and context-aware interfaces · Cory “Ike” Ilo, PhD',
    description: 'Publications (ACM SUI 2024, IEEE ISMAR 2026, XRSecurity 2026), a to-scale research journey with planned work, the dissertation and its three studies, talks, and professional memberships (NSBE, Tau Beta Pi, IEEE, ACM).',
    type: 'CollectionPage'
  },
  cv: { title: 'CV — Cory “Ike” Ilo, PhD (moved to the home page)', description: 'The CV now lives on the home page: bio, headline receipts, and the CV as PDF.', type: 'WebPage' },
  org: { title: 'The Org — DIBIA, a human-compute research collective', description: 'DIBIA: a collective of independent researchers and engineers. Founders Cory “Ike” Ilo and Michael Robles, the ventures in development (SpatialSENSai, sudo / Aperture, DigiGreenBookZ), and how teams are organized.', type: 'AboutPage' },
  marketplace: { title: 'Marketplace — DIBIA · services from independent researchers and engineers', description: 'Every service offered by the members of the DIBIA Dossier: XR prototypes, privacy reviews, user studies, LLM integration, automation, data and infrastructure. One brief, one contract.', type: 'WebPage' },
  dossier: { title: 'The Dossier — DIBIA · vetted research-grade operatives for startups', description: 'The DIBIA Dossier: vetted research-grade operatives for startups and businesses. Fixed-scope missions, a three-person cell on every job, a Jonin or Kage guiding. Post a mission brief.', type: 'CollectionPage' },
  contact: { title: 'Contact — Cory “Ike” Ilo · DIBIA consultancy', description: 'Book an XR privacy, gaze systems, or human-AI collaboration engagement with Dr. Cory “Ike” Ilo.', type: 'ContactPage' },
  'paper-arpa': { title: 'Privacy on Autopilot (IEEE ISMAR ’26) — XR assistant autonomy and privacy awareness', description: 'ARPA, an AR privacy assistant with three autonomy levels, evaluated in a within-subjects study (N=30). Automation redistributes the privacy burden rather than removing it. IEEE ISMAR 2026, Bari.', type: 'ScholarlyArticle' },
  'paper-goldilocks': { title: 'GoldiLocks Zoning (ACM SUI ’24) — gaze-aware VR notification placement', description: 'Gaze alone, read as passive context, drives task-agnostic VR notification placement without imaging the environment. ACM Symposium on Spatial User Interaction 2024.', type: 'ScholarlyArticle' },
  'paper-inplaingaze': { title: 'Hidden in Plain Gaze — gaze representations as privacy controls (manuscript, 2026)', description: 'Gaze representation is a privacy lever: engineered features keep ~85% of task utility while cutting re-identification by an order of magnitude across 206 identities (HoloAssist).', type: 'WebPage' }
};
