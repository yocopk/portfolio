"use client";

import { useTranslations } from "next-intl";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";

const TECH_STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind",
  "GSAP",
  "Go",
  "Python",
  "Docker",
  "Vercel",
  "Dokploy",
  "Cloudflare",
  "Redis",
  "MinIO",
] as const;

export function HomeMarquee() {
  const t = useTranslations("home.marquee");
  const content = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      aria-label={t("label")}
      className="relative overflow-hidden border-y border-[var(--color-sumi)]/8 bg-[var(--color-sumi)] py-8 md:py-10"
    >
      {/* Label fading in from sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-32 items-center justify-start bg-gradient-to-r from-[var(--color-sumi)] via-[var(--color-sumi)] to-transparent pl-6">
        <span className="hidden font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-washi)]/55 md:inline">
          {t("label")} ·
        </span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--color-sumi)] to-transparent" />

      <div
        className="marquee flex w-max items-center gap-8 whitespace-nowrap will-change-transform"
        style={{ animation: "marquee 32s linear infinite" }}
      >
        {content.map((tech, i) => (
          <div key={`${tech}-${i}`} className="flex items-center gap-8">
            <span
              className="font-display tracking-[-0.02em] text-[var(--color-washi)]"
              style={{ fontSize: "clamp(1.5rem, 1rem + 1.6vw, 2.5rem)" }}
            >
              {tech}
            </span>
            <JapaneseEmblem
              kind="enso"
              className="h-5 w-5 text-[var(--color-shu)]/80 shrink-0"
              strokeWidth={2}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee { animation: none !important; }
        }
        section:hover .marquee { animation-play-state: paused; }
      `}</style>
    </section>
  );
}
