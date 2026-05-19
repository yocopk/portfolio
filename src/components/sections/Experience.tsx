"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KanjiLabel } from "@/components/ui/KanjiLabel";
import { experience } from "@/content/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const t = useTranslations("journey");
  const locale = useLocale() as "en" | "it";
  const rootRef = useRef<HTMLElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!rootRef.current || !linePathRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const path = linePathRef.current;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len });

    if (reduced) {
      gsap.set(path, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(path, { strokeDashoffset: len });

    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top 70%",
      end: "bottom 70%",
      scrub: 0.8,
      animation: gsap.to(path, { strokeDashoffset: 0, ease: "none" }),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={rootRef}
      id="journey"
      className="relative px-6 py-[var(--space-section)] md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <KanjiLabel
            glyph={t("kanji")}
            reading={t("reading")}
            label={t("label")}
            meaning="the way · path"
            size="lg"
          />
          <div className="flex flex-col items-end gap-2">
            <h2
              className="font-display italic tracking-[-0.02em] text-[var(--color-sumi)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              {t("title")}
            </h2>
            <p className="max-w-md text-right font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
              {t("intro")}
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-[120px_1fr] md:gap-x-12">
          {/* Vertical brush-stroke line */}
          <svg
            aria-hidden="true"
            viewBox="0 0 20 1000"
            preserveAspectRatio="none"
            className="absolute left-[60px] top-0 hidden h-full w-5 text-[var(--color-shu)] md:block"
          >
            <path
              ref={linePathRef}
              d="M 10 10 C 4 250, 16 500, 10 750 C 4 900, 10 980, 10 990"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Entries */}
          <div className="contents">
            {experience.map((entry, i) => (
              <TimelineEntry
                key={`${entry.company}-${entry.period}`}
                entry={entry}
                locale={locale}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  entry,
  locale,
  index,
}: {
  entry: (typeof experience)[number];
  locale: "en" | "it";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <>
      {/* Left column: period + dot */}
      <div className="relative md:pt-1">
        <div className="absolute left-[52px] top-2 hidden h-4 w-4 -translate-x-1/2 md:block">
          <motion.span
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="block h-full w-full rounded-full border-2 border-[var(--color-washi)] bg-[var(--color-shu)] shadow-[0_0_0_2px_var(--color-shu)]"
          />
        </div>
        <motion.span
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone)]"
        >
          <span>{entry.period}</span>
          {entry.current && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-shu)]/10 px-2 py-0.5 text-[var(--color-shu)]">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-shu)]" />
              Now
            </span>
          )}
        </motion.span>
      </div>

      {/* Right column: content */}
      <motion.div
        initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
        animate={
          inView
            ? { opacity: 1, x: 0, filter: "blur(0px)" }
            : undefined
        }
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="pb-2"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3
            className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
            style={{ fontSize: "clamp(1.4rem, 1rem + 1vw, 2rem)" }}
          >
            {entry.role[locale]}{" "}
            <span className="text-[var(--color-shu)]">·</span>{" "}
            <span className="italic text-[var(--color-sumi-soft)]">
              {entry.company}
            </span>
          </h3>
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
            {entry.location}
          </span>
        </div>

        <p className="mt-3 max-w-prose text-[var(--color-sumi-soft)]">
          {entry.summary[locale]}
        </p>

        {entry.highlights && (
          <ul className="mt-4 flex flex-col gap-1.5 text-sm text-[var(--color-sumi-soft)]/90">
            {entry.highlights[locale].map((h, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-[2px] w-3 flex-shrink-0 bg-[var(--color-shu)]"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </>
  );
}
