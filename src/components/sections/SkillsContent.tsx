"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";
import { skills } from "@/content/skills";

export function SkillsContent() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative px-6 py-[var(--space-section)] md:px-10">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12"
        >
          <div className="md:col-span-3">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <JapaneseEmblem
                  kind="kikko"
                  className="h-8 w-8 text-[var(--color-sumi)]"
                />
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                  {t("skillsLabel")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-sumi-soft)]">
                {t("skillsIntro")}
              </p>
            </div>
          </div>

          <div className="md:col-span-9 md:pl-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
              {(["frontend", "backend", "data", "ops"] as const).map(
                (cat, idx) => (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : undefined
                    }
                    transition={{
                      duration: 0.85,
                      delay: 0.08 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="bento-card flex flex-col gap-4 p-6"
                  >
                    <div className="flex items-baseline justify-between border-b border-[var(--color-sumi)]/10 pb-3">
                      <span className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[var(--color-stone)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base tracking-tight text-[var(--color-sumi)]">
                        {t(`categories.${cat}`)}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {skills[cat].map((s) => (
                        <li
                          key={s.name}
                          className="group flex items-center justify-between gap-2 text-sm text-[var(--color-sumi-soft)]"
                        >
                          <span className="transition-colors duration-200 group-hover:text-[var(--color-shu)]">
                            {s.name}
                          </span>
                          <span
                            aria-hidden="true"
                            className="flex gap-0.5"
                            title={`Proficiency ${s.level}/3`}
                          >
                            {Array.from({ length: 3 }).map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < s.level
                                    ? "h-1 w-3 rounded-full bg-[var(--color-sumi)]"
                                    : "h-1 w-3 rounded-full bg-[var(--color-sumi)]/15"
                                }
                              />
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
