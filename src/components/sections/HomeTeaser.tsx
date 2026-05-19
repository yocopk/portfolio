"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { JapaneseEmblem, type EmblemKind } from "@/components/ui/JapaneseEmblem";
import { cn } from "@/lib/utils";

type TeaserKey = "about" | "work" | "journey" | "contact";

interface Teaser {
  key: TeaserKey;
  href: "/about" | "/work" | "/journey" | "/contact";
  emblem: EmblemKind;
  number: string;
  span: string;
  variant?: "paper" | "ink";
}

const TEASERS: Teaser[] = [
  {
    key: "about",
    href: "/about",
    emblem: "sakura",
    number: "01",
    span: "md:col-span-7",
  },
  {
    key: "work",
    href: "/work",
    emblem: "seigaiha",
    number: "02",
    span: "md:col-span-5",
    variant: "ink",
  },
  {
    key: "journey",
    href: "/journey",
    emblem: "tomoe",
    number: "03",
    span: "md:col-span-5",
  },
  {
    key: "contact",
    href: "/contact",
    emblem: "shippo",
    number: "04",
    span: "md:col-span-7",
  },
];

export function HomeTeaser() {
  const t = useTranslations("home");
  const tt = useTranslations("home.teasers");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative px-6 py-[var(--space-section)] md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
              ☰ Index
            </span>
            <h2
              className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
              style={{ fontSize: "var(--text-display)", lineHeight: 0.95 }}
            >
              {t("teaserHeading")}
            </h2>
          </div>
          <p className="max-w-sm font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone)] md:text-right">
            {t("teaserIntro")}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {TEASERS.map((teaser, i) => (
            <TeaserCard
              key={teaser.key}
              teaser={teaser}
              data={{
                label: tt(`${teaser.key}.label`),
                title: tt(`${teaser.key}.title`),
                blurb: tt(`${teaser.key}.blurb`),
                cta: tt(`${teaser.key}.cta`),
              }}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeaserCard({
  teaser,
  data,
  index,
  inView,
}: {
  teaser: Teaser;
  data: { label: string; title: string; blurb: string; cta: string };
  index: number;
  inView: boolean;
}) {
  const isInk = teaser.variant === "ink";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "col-span-1",
        teaser.span,
        "bento-card group relative overflow-hidden p-7 md:p-9",
        isInk && "bento-card-dark",
      )}
    >
      <Link
        href={teaser.href}
        className="absolute inset-0 z-10"
        aria-label={data.cta}
      />

      {/* Decorative emblem */}
      <JapaneseEmblem
        kind={teaser.emblem}
        className={cn(
          "absolute right-[-2rem] top-[-2rem] h-56 w-56 transition-transform duration-700 ease-[var(--ease-zen)] group-hover:rotate-[-6deg] group-hover:scale-[1.06]",
          isInk
            ? "text-[var(--color-washi)]/8"
            : "text-[var(--color-sumi)]/10",
        )}
        strokeWidth={1.6}
      />

      <div className="relative flex h-full min-h-[260px] flex-col gap-5 md:min-h-[300px]">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "font-mono-ui text-[10px] uppercase tracking-[0.22em]",
              isInk ? "text-[var(--color-washi)]/60" : "text-[var(--color-stone)]",
            )}
          >
            {teaser.number} — {data.label}
          </span>
          <JapaneseEmblem
            kind={teaser.emblem}
            className={cn(
              "h-6 w-6 transition-colors",
              isInk
                ? "text-[var(--color-washi)]/40 group-hover:text-[var(--color-shu-faint)]"
                : "text-[var(--color-sumi)]/40 group-hover:text-[var(--color-shu)]",
            )}
            strokeWidth={1.8}
          />
        </div>

        <h3
          className={cn(
            "font-display tracking-[-0.02em]",
            isInk ? "text-[var(--color-washi)]" : "text-[var(--color-sumi)]",
          )}
          style={{ fontSize: "clamp(1.5rem, 1rem + 1.8vw, 2.2rem)", lineHeight: 1.05 }}
        >
          {data.title}
        </h3>

        <p
          className={cn(
            "max-w-md text-[15px] leading-relaxed",
            isInk ? "text-[var(--color-washi)]/75" : "text-[var(--color-sumi-soft)]",
          )}
        >
          {data.blurb}
        </p>

        <div
          className={cn(
            "mt-auto inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.2em] transition-colors",
            isInk
              ? "text-[var(--color-washi)] group-hover:text-[var(--color-shu-faint)]"
              : "text-[var(--color-sumi)] group-hover:text-[var(--color-shu)]",
          )}
        >
          {data.cta}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}
