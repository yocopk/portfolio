"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function splitWord(word: string) {
  return Array.from(word).map((ch, i) => (
    <span key={i} className="split-char inline-block" data-char>
      {ch}
    </span>
  ));
}

export function Hero() {
  const t = useTranslations("hero");
  const rootRef = useRef<HTMLElement>(null);
  const ensoPathRef = useRef<SVGPathElement>(null);
  const ensoDotRef = useRef<SVGCircleElement>(null);
  const brushPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-char]", rootRef.current!);

      if (reduced) {
        gsap.set(chars, { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" });
        if (brushPathRef.current) gsap.set(brushPathRef.current, { strokeDashoffset: 0 });
        if (ensoPathRef.current) gsap.set(ensoPathRef.current, { strokeDashoffset: 0 });
        if (ensoDotRef.current) gsap.set(ensoDotRef.current, { opacity: 0.7 });
        return;
      }

      gsap.set(chars, { opacity: 0, y: "0.7em", rotate: 3, filter: "blur(8px)" });

      const tl = gsap.timeline({ delay: 0.4 });

      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "expo.out",
        stagger: { each: 0.035, from: "start" },
      });

      const brush = brushPathRef.current;
      if (brush) {
        const len = brush.getTotalLength();
        gsap.set(brush, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(
          brush,
          { strokeDashoffset: 0, duration: 1.4, ease: "power3.inOut" },
          "-=0.6",
        );
      }

      const enso = ensoPathRef.current;
      if (enso) {
        const len = enso.getTotalLength();
        gsap.set(enso, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(
          enso,
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
          "-=1.4",
        );
      }
      if (ensoDotRef.current) {
        tl.to(ensoDotRef.current, { opacity: 0.7, duration: 0.2 }, "-=0.05");
      }

      // Parallax on the emblem
      gsap.to("[data-hero-emblem]", {
        yPercent: -22,
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to("[data-hero-meta]", {
        opacity: 0,
        y: -16,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "30% top",
          scrub: 0.4,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden px-6 pb-12 pt-6 md:px-10 md:pb-16 md:pt-10"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        {/* Top meta row */}
        <motion.div
          data-hero-meta
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between gap-4 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]"
        >
          <span>Portfolio · MMXXVI · v.1</span>
          <span className="hidden md:inline">{t("based")} — 41.9°N, 12.5°E</span>
        </motion.div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-sumi)]/10 bg-[var(--color-washi-soft)]/70 px-3 py-1.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-sumi)] shadow-[var(--shadow-paper)] backdrop-blur-sm"
        >
          <span aria-hidden="true" className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-shu)]/60" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--color-shu)]" />
          </span>
          {t("status")}
        </motion.div>

        {/* Main grid */}
        <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-12 md:grid-cols-[1fr_auto] md:gap-14">
          <div>
            <h1
              aria-label="Andrea Marchese"
              className="font-display leading-[0.85] tracking-[-0.03em] text-[var(--color-sumi)]"
              style={{ fontSize: "var(--text-hero)" }}
            >
              <span className="block overflow-hidden pb-[0.05em]">
                {splitWord("Andrea")}
              </span>
              <span className="block overflow-hidden pb-[0.05em] pl-[0.05em] italic">
                {splitWord("Marchese")}
              </span>
            </h1>

            {/* Brush stroke under name */}
            <svg
              viewBox="0 0 800 28"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="mt-2 block h-3 w-full max-w-xl text-[var(--color-shu)]"
            >
              <path
                ref={brushPathRef}
                d="M 8 16 C 120 6, 240 22, 360 14 C 480 6, 600 22, 792 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>

            <p
              data-hero-meta
              className="mt-7 font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)]"
            >
              <span className="text-[var(--color-sumi)]">{t("role")}</span>
              <span className="mx-2 text-[var(--color-shu)]">·</span>
              {t("based")}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl font-display text-2xl leading-[1.25] tracking-tight text-[var(--color-sumi)] md:text-3xl"
            >
              <span className="italic">{t("tagline")}</span>{" "}
              <span className="text-[var(--color-stone)]">{t("intro")}</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-sumi)] px-5 py-3 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-washi)] transition-transform duration-300 hover:scale-[1.03]"
              >
                {t("exploreAbout")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-sumi)]/15 bg-transparent px-5 py-3 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-sumi)] transition-colors hover:bg-[var(--color-sumi)]/5"
              >
                {t("exploreWork")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Geometric emblem — large enso 円相 */}
          <div
            data-hero-emblem
            className="relative hidden h-full items-center justify-center md:flex"
          >
            <svg
              viewBox="0 0 320 320"
              className="h-[clamp(220px,28vw,400px)] w-[clamp(220px,28vw,400px)] text-[var(--color-sumi)]"
              aria-hidden="true"
            >
              {/* Soft outer ring */}
              <circle
                cx="160"
                cy="160"
                r="148"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.1"
              />
              {/* Main enso — hand-drawn feel */}
              <path
                ref={ensoPathRef}
                d="M 270 170 C 268 220, 230 268, 170 270 C 100 272, 50 222, 50 152 C 50 80, 100 50, 165 50 C 220 50, 260 90, 270 140"
                fill="none"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <circle
                ref={ensoDotRef}
                cx="270"
                cy="140"
                r="5"
                fill="currentColor"
                opacity="0"
              />
              {/* Vermilion hanko square */}
              <rect
                x="230"
                y="230"
                width="60"
                height="60"
                rx="4"
                className="fill-[var(--color-shu)]"
                transform="rotate(-3 260 260)"
              />
              <text
                x="260"
                y="270"
                textAnchor="middle"
                className="font-display fill-[var(--color-washi)]"
                fontSize="22"
                fontStyle="italic"
                transform="rotate(-3 260 260)"
              >
                AM
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
