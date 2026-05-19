"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { BrushArt } from "@/components/ui/BrushArt";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const ART_VARIANTS = ["mountain", "wave", "circle", "bamboo"] as const;

const LAYOUT_SPANS = [
  "md:col-span-8",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-7",
];

export function ProjectsContent() {
  const t = useTranslations("work");
  const locale = useLocale() as "en" | "it";
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              locale={locale}
              index={i}
              span={LAYOUT_SPANS[i] ?? "md:col-span-6"}
              size={i === 0 ? "lg" : "md"}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

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
  size?: "lg" | "md";
  t: ReturnType<typeof useTranslations>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const isLarge = size === "lg";
  const variant = ART_VARIANTS[index % ART_VARIANTS.length];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, delay: 0.07 * index, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "col-span-1",
        span,
        "bento-card group relative min-h-[320px] overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-0.2deg] hover:shadow-[var(--shadow-paper-lift)] md:min-h-[380px]",
      )}
    >
      {/* Sumi-e decorative art */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-zen)] group-hover:scale-105"
      >
        <BrushArt variant={variant} accent={project.accent ?? "sumi"} />
      </div>

      <div className="relative flex h-full flex-col gap-5 p-6 md:p-9">
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

        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "font-display tracking-[-0.02em] text-[var(--color-sumi)]",
              isLarge
                ? "text-4xl md:text-5xl lg:text-6xl"
                : "text-2xl md:text-3xl",
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

        <p
          className={cn(
            "max-w-prose text-sm leading-relaxed text-[var(--color-sumi-soft)]/85",
            isLarge ? "block" : "hidden md:block",
          )}
        >
          {project.description[locale]}
        </p>

        {/* Meta — role + year mono */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
          <span>{t("role")} <span className="text-[var(--color-sumi)]">· {project.role[locale]}</span></span>
          <span>{t("year")} <span className="text-[var(--color-sumi)]">· {project.year}</span></span>
        </div>

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
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-sumi)] px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-washi)] transition-transform hover:scale-[1.03]"
              >
                {t("viewLive")} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
