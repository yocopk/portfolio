export interface Project {
  slug: string;
  title: string;
  subtitle: { en: string; it: string };
  description: { en: string; it: string };
  year: string;
  role: { en: string; it: string };
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  accent?: "shu" | "sumi" | "gold";
}

export const projects: Project[] = [
  {
    slug: "moghouse",
    title: "MogHouse",
    subtitle: {
      en: "Community platform for Final Fantasy XIV players",
      it: "Piattaforma community per giocatori di Final Fantasy XIV",
    },
    description: {
      en: "Full-stack social platform built for the FFXIV community. Real-time presence, character integration, profile customisation, and a content layer powered by Postgres + Prisma.",
      it: "Piattaforma social full-stack per la community di FFXIV. Presenza in tempo reale, integrazione personaggi, customizzazione profili e content layer su Postgres + Prisma.",
    },
    year: "2025—",
    role: { en: "Founder & Engineer", it: "Founder & Sviluppatore" },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Dokploy", "MinIO"],
    liveUrl: "https://mog-house.com",
    featured: true,
    accent: "shu",
  },
  {
    slug: "italian-wedding-events",
    title: "Italian Wedding Events",
    subtitle: {
      en: "Bilingual marketing site for a destination-wedding agency",
      it: "Sito marketing bilingue per agenzia di destination wedding",
    },
    description: {
      en: "Editorial-style marketing site with bilingual content, smooth motion, and a custom CMS layer. Hosted on Vercel with edge i18n.",
      it: "Sito marketing editoriale, contenuti bilingui, motion curato e CMS custom. Hosting Vercel con i18n on edge.",
    },
    year: "2025",
    role: { en: "Lead Developer", it: "Lead Developer" },
    stack: ["Next.js", "TypeScript", "Tailwind", "i18n", "Vercel"],
    featured: true,
    accent: "gold",
  },
  {
    slug: "domusicily",
    title: "DomuSicily",
    subtitle: {
      en: "Property management dashboard for short-term rentals in Sicily",
      it: "Dashboard di property management per affitti brevi in Sicilia",
    },
    description: {
      en: "Booking + revenue management for a portfolio of holiday properties. Integrates channel managers and review platforms; custom widget pipeline.",
      it: "Booking + revenue management per un portafoglio di case vacanza. Integrazione channel manager e piattaforme review; pipeline widget custom.",
    },
    year: "2024—2025",
    role: { en: "Full Stack Engineer", it: "Full Stack Engineer" },
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "REST"],
    featured: true,
    accent: "sumi",
  },
  {
    slug: "ai-experiments",
    title: "AI Experiments",
    subtitle: {
      en: "Small LLM-powered tools, agents, retrieval pipelines",
      it: "Piccoli strumenti LLM, agenti, pipeline di retrieval",
    },
    description: {
      en: "An ongoing series of small experiments: agentic workflows, RAG over private corpora, structured-output tooling for production apps.",
      it: "Una serie continua di esperimenti: workflow agentici, RAG su corpus privati, tooling structured-output per app in produzione.",
    },
    year: "2024—",
    role: { en: "Builder", it: "Costruttore" },
    stack: ["Python", "TypeScript", "LangChain", "OpenAI", "Anthropic"],
    featured: true,
    accent: "sumi",
  },
];
