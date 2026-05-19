"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Github } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { KanjiLabel } from "@/components/ui/KanjiLabel";
import { BrushArt } from "@/components/ui/BrushArt";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const ART_VARIANTS = ["mountain", "wave", "circle", "bamboo"] as const;

function ProjectCard({
  project,
  locale,
  index,
  span,
  size = "md",
  t,
}: {
  project: Project;
  locale: "en" | "it";
  index: number;
  span: string;
  size?: "lg" | "md" | "sm";
  t: ReturnType<typeof useTranslations<"work">>;
}) {
  const isLarge = size === "lg";
  const variant = ART_VARIANTS[index % ART_VARIANTS.length];

  return (
    <BentoCard
      span={cn(span, "group relative overflow-hidden")}
      delay={0.05 * index}
      interactive
      className="min-h-[280px] md:min-h-[340px]"
    >
      {/* Decorative sumi-e art */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-zen)] group-hover:scale-105"
      >
        <BrushArt variant={variant} accent={project.accent ?? "sumi"} />
      </div>

      <div className="relative flex h-full flex-col gap-5 p-6 md:p-8">
        {/* Top row: year + accent */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
            {project.year}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-2 w-2 rounded-full",
              project.accent === "shu"
                ? "bg-[var(--color-shu)]"
                : project.accent === "gold"
                  ? "bg-[var(--color-gold)]"
                  : "bg-[var(--color-sumi)]",
            )}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "font-display tracking-[-0.02em] text-[var(--color-sumi)]",
              isLarge ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl",
            )}
            style={{ lineHeight: 0.95 }}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              "text-[var(--color-sumi-soft)]",
              isLarge ? "text-base md:text-lg" : "text-sm",
            )}
          >
            {project.subtitle[locale]}
          </p>
        </div>

        {/* Description — visible always on large, on hover on small */}
        <p
          className={cn(
            "max-w-prose text-sm leading-relaxed text-[var(--color-sumi-soft)]/85",
            isLarge ? "block" : "hidden md:block",
          )}
        >
          {project.description[locale]}
        </p>

        {/* Bottom: stack + links */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, isLarge ? 6 : 4).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-[var(--color-sumi)]/12 bg-[var(--color-washi)]/40 px-2.5 py-1 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--color-sumi-soft)] backdrop-blur-sm"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — ${t("viewCode")}`}
                data-cursor="hover"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-sumi)]/12 bg-[var(--color-washi)]/50 text-[var(--color-sumi)] transition-colors hover:bg-[var(--color-sumi)] hover:text-[var(--color-washi)]"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — ${t("viewLive")}`}
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-sumi)] px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-washi)] transition-transform hover:scale-[1.03]"
              >
                {t("viewLive")} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

export function ProjectsSection() {
  const t = useTranslations("work");
  const locale = useLocale() as "en" | "it";
  const featured = projects.filter((p) => p.featured);

  // Asymmetric bento layout — col spans on a 12-col grid.
  // Wabi-sabi: nothing is the same size.
  const layouts = [
    "col-span-12 md:col-span-8",  // Hero project
    "col-span-12 md:col-span-4",  // Tall companion
    "col-span-12 md:col-span-5",  // Medium
    "col-span-12 md:col-span-7",  // Wider
  ];

  return (
    <section
      id="work"
      className="relative px-6 py-[var(--space-section)] md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <KanjiLabel
            glyph={t("kanji")}
            reading={t("reading")}
            label={t("label")}
            meaning="work · craft"
            size="lg"
          />
          <div className="flex flex-col items-end gap-2">
            <h2
              className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              {t("title")}
            </h2>
            <p className="max-w-md text-right font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
              {t("intro")}
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              locale={locale}
              index={i}
              span={layouts[i] ?? "col-span-12 md:col-span-6"}
              size={i === 0 ? "lg" : "md"}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
