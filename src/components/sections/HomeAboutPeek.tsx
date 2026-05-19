"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";

interface Value {
  title: string;
  body: string;
}

export function HomeAboutPeek() {
  const t = useTranslations("home.aboutPeek");
  const paragraphs = t.raw("paragraphs") as string[];
  const values = t.raw("values") as Value[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative px-6 py-[var(--space-section)] md:px-10">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Left column — emblem + kicker + title */}
          <div className="md:col-span-4">
            <div className="sticky top-32 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <JapaneseEmblem
                  kind="sakura"
                  className="h-20 w-20 text-[var(--color-shu)] md:h-28 md:w-28"
                  strokeWidth={1.2}
                  accent
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-[var(--color-shu)]"
              >
                — {t("kicker")}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={
                  inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
                }
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
                style={{
                  fontSize: "clamp(2rem, 1rem + 3vw, 3.25rem)",
                  lineHeight: 0.95,
                }}
              >
                {t("title")}
              </motion.h2>
            </div>
          </div>

          {/* Right column — paragraphs + values */}
          <div className="flex flex-col gap-10 md:col-span-8 md:pl-2">
            <div className="flex max-w-2xl flex-col gap-5">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.85,
                    delay: 0.25 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-[var(--color-sumi-soft)]"
                  style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                — {t("valuesLabel")}
              </span>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {values.map((v, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : undefined
                    }
                    transition={{
                      duration: 0.85,
                      delay: 0.5 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-col gap-2 border-t border-[var(--color-sumi)]/15 pt-4"
                  >
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-shu)]">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg leading-tight tracking-tight text-[var(--color-sumi)]">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-sumi-soft)]">
                      {v.body}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-sumi)]/15 bg-transparent px-5 py-3 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-sumi)] transition-colors hover:bg-[var(--color-sumi)]/5"
              >
                {t("cta")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
