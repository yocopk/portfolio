"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/content/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Vertical timeline with a single brush stroke line spanning the
 * whole list and dots perfectly aligned on the same vertical axis.
 *
 * Grid columns: [date 9rem] [line 1rem] [content 1fr]
 * The line lives at the center of the middle column (left: ~10rem).
 * Each dot is placed in the middle column at the same horizontal position.
 */
export function JourneyContent() {
  const locale = useLocale() as "en" | "it";
  const rootRef = useRef<HTMLDivElement>(null);
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
      start: "top 65%",
      end: "bottom 80%",
      scrub: 0.8,
      animation: gsap.to(path, { strokeDashoffset: 0, ease: "none" }),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div ref={rootRef} className="relative">
          {/* Single brush-stroke line spanning the whole timeline.
              Sits at the horizontal center of the middle column. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 12 1000"
            preserveAspectRatio="none"
            className="absolute top-0 hidden h-full w-3 text-[var(--color-shu)] md:block"
            style={{ left: "calc(9rem + 0.5rem - 0.375rem)" }}
          >
            <path
              ref={linePathRef}
              d="M 6 6 C 3 250, 9 500, 6 750 C 3 900, 6 980, 6 994"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <ol className="flex flex-col gap-10 md:gap-14">
            {experience.map((entry, i) => (
              <TimelineEntry
                key={`${entry.company}-${entry.period}`}
                entry={entry}
                locale={locale}
                index={i}
              />
            ))}
          </ol>
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
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[1fr] gap-y-4 md:grid-cols-[9rem_1rem_1fr] md:gap-x-6 md:gap-y-0"
    >
      {/* Date — left column */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 pt-1 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone)] md:justify-end md:text-right"
      >
        <span>{entry.period}</span>
        {entry.current && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-shu)]/10 px-2 py-0.5 text-[var(--color-shu)]">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-shu)]" />
            Now
          </span>
        )}
      </motion.div>

      {/* Middle column with dot — only on md+, dot sits on the line */}
      <div className="hidden md:flex md:items-start md:justify-center md:pt-2">
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{
            duration: 0.5,
            delay: 0.12,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          aria-hidden="true"
          className="relative inline-block h-3 w-3 rounded-full border-2 border-[var(--color-washi)] bg-[var(--color-shu)]"
          style={{ boxShadow: "0 0 0 3px var(--color-washi)" }}
        />
      </div>

      {/* Content — right column */}
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : undefined
        }
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="pb-2"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3
            className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
            style={{ fontSize: "clamp(1.4rem, 1rem + 1vw, 2rem)", lineHeight: 1.1 }}
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
            {entry.highlights[locale].map((h, hi) => (
              <li key={hi} className="flex gap-2.5">
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
    </li>
  );
}
