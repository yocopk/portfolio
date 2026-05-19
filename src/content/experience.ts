export interface ExperienceEntry {
  period: string;
  company: string;
  role: { en: string; it: string };
  location: string;
  summary: { en: string; it: string };
  highlights?: { en: string[]; it: string[] };
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    period: "2024 — Present",
    company: "Emergento",
    role: {
      en: "Full Stack Developer",
      it: "Sviluppatore Full Stack",
    },
    location: "Italy · Remote",
    summary: {
      en: "Building production web platforms across hospitality, weddings, and community products. End-to-end ownership from product design to deployment.",
      it: "Costruzione di piattaforme web in produzione su hospitality, wedding e prodotti community. End-to-end ownership: dal product design al deploy.",
    },
    highlights: {
      en: [
        "Shipped 4 multi-tenant Next.js apps to production",
        "Designed bilingual content infrastructure used across the agency",
        "Set up self-hosted Dokploy stack for staging + prod",
      ],
      it: [
        "Messo in produzione 4 app Next.js multi-tenant",
        "Progettata infrastruttura content bilingue usata in tutta l'agenzia",
        "Implementato stack self-hosted Dokploy per staging + prod",
      ],
    },
    current: true,
  },
  {
    period: "2023 — 2024",
    company: "Independent",
    role: {
      en: "Freelance Engineer",
      it: "Sviluppatore Freelance",
    },
    location: "Italy",
    summary: {
      en: "Small full-stack engagements for early-stage products. Architecture, MVPs, and the occasional rescue project.",
      it: "Piccoli ingaggi full-stack per prodotti early-stage. Architettura, MVP e qualche progetto di salvataggio.",
    },
  },
  {
    period: "2021 — 2023",
    company: "Self-taught journey",
    role: {
      en: "Apprenticeship",
      it: "Apprendistato",
    },
    location: "Italy",
    summary: {
      en: "Deep dive into TypeScript, React, Next.js, databases and the wider web ecosystem. Side projects, open source, and the slow, deliberate craft of getting better.",
      it: "Immersione profonda in TypeScript, React, Next.js, database e l'ecosistema web. Side project, open source e l'arte lenta e voluta del migliorare.",
    },
  },
];
