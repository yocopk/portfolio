"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";
import { primaryEmail } from "@/content/social";

export function HomeFinalCTA() {
  const t = useTranslations("home.finalCta");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative px-6 pb-[var(--space-section)] md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[var(--color-sumi)] px-7 py-16 text-[var(--color-washi)] md:px-16 md:py-24"
        >
          {/* Background emblem */}
          <JapaneseEmblem
            kind="enso"
            className="absolute -right-16 -top-16 h-[28rem] w-[28rem] text-[var(--color-washi)]/8"
            strokeWidth={1.2}
          />
          <JapaneseEmblem
            kind="asanoha"
            className="absolute -left-10 bottom-[-3rem] h-56 w-56 text-[var(--color-shu)]/15"
            strokeWidth={1.4}
          />

          <div className="relative flex flex-col gap-6">
            <span className="inline-flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-washi)]/60">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--color-shu)]" />
              {t("kicker")}
            </span>

            <h2
              className="max-w-3xl font-display tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)", lineHeight: 0.95 }}
            >
              {t("title")}
            </h2>

            <p
              className="max-w-2xl text-[var(--color-washi)]/75"
              style={{ fontSize: "var(--text-lead)" }}
            >
              {t("lead")}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${primaryEmail}`}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-shu)] px-5 py-3.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-washi)] transition-transform duration-300 hover:scale-[1.03]"
              >
                {t("primary")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-washi)]/20 bg-[var(--color-washi)]/5 px-5 py-3 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-washi)]/85 transition-colors hover:bg-[var(--color-washi)]/10"
              >
                {t("secondary")}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
