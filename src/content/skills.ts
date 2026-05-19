export type SkillCategory = "frontend" | "backend" | "data" | "ops";

export interface Skill {
  name: string;
  level: 1 | 2 | 3;
}

export const skills: Record<SkillCategory, Skill[]> = {
  frontend: [
    { name: "TypeScript", level: 3 },
    { name: "React", level: 3 },
    { name: "Next.js", level: 3 },
    { name: "Tailwind CSS", level: 3 },
    { name: "GSAP", level: 2 },
    { name: "Three.js / R3F", level: 2 },
    { name: "Svelte", level: 2 },
  ],
  backend: [
    { name: "Node.js", level: 3 },
    { name: "Go", level: 2 },
    { name: "PostgreSQL", level: 3 },
    { name: "Prisma", level: 3 },
    { name: "tRPC", level: 2 },
    { name: "REST / GraphQL", level: 3 },
    { name: "Redis", level: 2 },
  ],
  data: [
    { name: "Python", level: 2 },
    { name: "LangChain", level: 2 },
    { name: "OpenAI / Anthropic", level: 2 },
    { name: "Vector DBs", level: 2 },
    { name: "ETL pipelines", level: 2 },
  ],
  ops: [
    { name: "Docker", level: 3 },
    { name: "Dokploy", level: 3 },
    { name: "Vercel", level: 3 },
    { name: "GitHub Actions", level: 2 },
    { name: "Cloudflare", level: 2 },
    { name: "Nginx", level: 2 },
    { name: "Linux", level: 3 },
  ],
};
