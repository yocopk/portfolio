"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";
import { BrushArt } from "@/components/ui/BrushArt";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const ART_VARIANTS = ["mountain", "wave", "circle", "bamboo"] as const;

export function HomeFeaturedWork() {
  const t = useTranslations("home.featuredWork");
  const locale = useLocale() as "en" | "it";
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative px-6 py-[var(--space-section)] md:px-10">
      <div ref={ref} className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:mb-14 md:grid-cols-12 md:items-end">
          <div className="flex items-center gap-4 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <JapaneseEmblem
                kind="seigaiha"
                className="h-14 w-14 text-[var(--color-sumi)]"
                strokeWidth={1.3}
              />
            </motion.div>
            <div className="flex flex-col gap-1">
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-[var(--color-shu)]">
                — {t("kicker")}
              </span>
              <h2
                className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
                style={{
                  fontSize: "clamp(1.75rem, 1rem + 2.4vw, 2.75rem)",
                  lineHeight: 0.95,
                }}
              >
                {t("title")}
              </h2>
            </div>
          </div>
          <p className="max-w-md font-mono-ui text-[11px] uppercase leading-relaxed tracking-[0.18em] text-[var(--color-stone)] md:col-span-5 md:text-right">
            {t("intro")}
          </p>
        </div>

        {/* Three project cards — same size for tidy preview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {featured.map((p, i) => (
            <ProjectPreview
              key={p.slug}
              project={p}
              locale={locale}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center md:mt-14"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-sumi)] px-6 py-3.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-washi)] transition-transform duration-300 hover:scale-[1.03]"
          >
            {t("cta")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectPreview({
  project,
  locale,
  index,
  inView,
}: {
  project: Project;
  locale: "en" | "it";
  index: number;
  inView: boolean;
}) {
  const variant = ART_VARIANTS[index % ART_VARIANTS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.95, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card group relative min-h-[340px] overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-0.2deg] hover:shadow-[var(--shadow-paper-lift)]"
    >
      <Link
        href="/work"
        className="absolute inset-0 z-10"
        aria-label={project.title}
      />

      {/* Sumi-e art */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-zen)] group-hover:scale-105"
      >
        <BrushArt variant={variant} accent={project.accent ?? "sumi"} />
      </div>

      <div className="relative flex h-full flex-col gap-4 p-6">
        <div className="flex items-start justify-between">
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

        <div className="flex flex-col gap-1.5">
          <h3
            className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
            style={{ fontSize: "clamp(1.5rem, 1rem + 1vw, 1.85rem)", lineHeight: 1.02 }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-sumi-soft)]">
            {project.subtitle[locale]}
          </p>
        </div>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[var(--color-sumi)]/12 bg-[var(--color-washi)]/40 px-2.5 py-1 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--color-sumi-soft)] backdrop-blur-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
