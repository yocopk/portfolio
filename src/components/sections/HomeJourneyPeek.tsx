"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";
import { experience } from "@/content/experience";

export function HomeJourneyPeek() {
  const t = useTranslations("home.journeyPeek");
  const locale = useLocale() as "en" | "it";
  const entries = experience.slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative px-6 py-[var(--space-section)] md:px-10">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Left — heading */}
          <div className="md:col-span-4">
            <div className="sticky top-32 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -45 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <JapaneseEmblem
                  kind="tomoe"
                  className="h-20 w-20 text-[var(--color-sumi)] md:h-28 md:w-28"
                  strokeWidth={1.4}
                />
              </motion.div>
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-[var(--color-shu)]">
                — {t("kicker")}
              </span>
              <h2
                className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
                style={{
                  fontSize: "clamp(2rem, 1rem + 3vw, 3.25rem)",
                  lineHeight: 0.95,
                }}
              >
                {t("title")}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-sumi-soft)]">
                {t("intro")}
              </p>
              <div>
                <Link
                  href="/journey"
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-sumi)]/15 bg-transparent px-5 py-3 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-sumi)] transition-colors hover:bg-[var(--color-sumi)]/5"
                >
                  {t("cta")}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right — compact timeline (no big SVG line, just compact entries) */}
          <ol className="relative md:col-span-8 md:pl-2">
            {/* Single thin line on the left */}
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-[var(--color-shu)]/30 to-transparent sm:block"
            />
            {entries.map((entry, i) => (
              <motion.li
                key={`${entry.company}-${entry.period}`}
                initial={{ opacity: 0, x: -12, filter: "blur(6px)" }}
                animate={
                  inView
                    ? { opacity: 1, x: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: 0.85,
                  delay: 0.1 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pb-8 sm:pl-10 last:pb-0"
              >
                {/* Dot */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 hidden h-4 w-4 items-center justify-center sm:flex"
                >
                  <span className="h-3 w-3 rounded-full border-2 border-[var(--color-washi)] bg-[var(--color-shu)] shadow-[0_0_0_3px_var(--color-washi)]" />
                </span>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
                      {entry.period}
                    </span>
                    {entry.current && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-shu)]/10 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[var(--color-shu)]">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-shu)]" />
                        Now
                      </span>
                    )}
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone-light)]">
                      · {entry.location}
                    </span>
                  </div>
                  <h3
                    className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
                    style={{
                      fontSize: "clamp(1.25rem, 1rem + 0.8vw, 1.65rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {entry.role[locale]}{" "}
                    <span className="text-[var(--color-shu)]">·</span>{" "}
                    <span className="italic text-[var(--color-sumi-soft)]">
                      {entry.company}
                    </span>
                  </h3>
                  <p className="max-w-prose text-sm leading-relaxed text-[var(--color-sumi-soft)]/85">
                    {entry.summary[locale]}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
