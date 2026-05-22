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
  const brushPathRef = useRef<SVGPathElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const kanjiRef = useRef<HTMLSpanElement>(null);
  const stampBrushRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-char]", rootRef.current!);

      if (reduced) {
        gsap.set(chars, { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" });
        if (brushPathRef.current)
          gsap.set(brushPathRef.current, { strokeDashoffset: 0 });
        if (stampRef.current) gsap.set(stampRef.current, { scale: 1, opacity: 1 });
        if (kanjiRef.current)
          gsap.set(kanjiRef.current, { scale: 1, opacity: 1, filter: "blur(0px)" });
        if (stampBrushRef.current)
          gsap.set(stampBrushRef.current, { strokeDashoffset: 0 });
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

      // Hanko stamp slams in with elastic bounce
      if (stampRef.current) {
        gsap.set(stampRef.current, { scale: 0, opacity: 0, rotate: -8 });
        tl.to(
          stampRef.current,
          {
            scale: 1,
            opacity: 1,
            rotate: -3,
            duration: 1.2,
            ease: "back.out(1.4)",
          },
          "-=1.6",
        );
      }
      // Kanji reveals after the stamp lands
      if (kanjiRef.current) {
        gsap.set(kanjiRef.current, { scale: 1.4, opacity: 0, filter: "blur(12px)" });
        tl.to(
          kanjiRef.current,
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "expo.out",
          },
          "-=0.7",
        );
      }
      // Brush ring traces around the stamp
      if (stampBrushRef.current) {
        const len = stampBrushRef.current.getTotalLength();
        gsap.set(stampBrushRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        tl.to(
          stampBrushRef.current,
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" },
          "-=0.8",
        );
      }

      // Parallax on the emblem
      gsap.to("[data-hero-emblem]", {
        yPercent: -22,
        rotate: 4,
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

          {/* Hero emblem — large hanko stamp with 武 */}
          <div
            data-hero-emblem
            className="relative hidden h-full items-center justify-center md:flex"
          >
            <div className="relative h-[clamp(260px,30vw,420px)] w-[clamp(260px,30vw,420px)]">
              {/* Brush ring that traces around the stamp */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 420 420"
                aria-hidden="true"
              >
                <path
                  ref={stampBrushRef}
                  d="M 60 80 C 40 130, 38 250, 70 340 C 110 380, 230 380, 320 360 C 380 340, 390 220, 370 140 C 350 80, 280 50, 200 50 C 150 50, 90 60, 60 80 Z"
                  fill="none"
                  stroke="var(--color-sumi)"
                  strokeWidth="3"
                  strokeOpacity="0.18"
                  strokeLinecap="round"
                />
              </svg>

              {/* Hanko stamp — big vermilion square with 武 */}
              <div
                ref={stampRef}
                className="absolute inset-[14%] flex items-center justify-center rounded-[14px] bg-[var(--color-sumi)] shadow-[0_18px_50px_-12px_rgba(14,13,12,0.45)]"
                style={{ transform: "rotate(-3deg)" }}
              >
                {/* Vermilion stamp ink layer with subtle texture */}
                <div className="absolute inset-2 overflow-hidden rounded-[10px] bg-[var(--color-shu)]">
                  {/* Ink imperfection — top right */}
                  <span
                    aria-hidden="true"
                    className="absolute right-2 top-2 h-2 w-12 bg-[var(--color-sumi)]/15"
                  />
                  {/* Ink imperfection — bottom left */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-2 h-1.5 w-8 bg-[var(--color-sumi)]/10"
                  />
                </div>

                {/* Inset washi border — stamp authenticity */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-6 rounded-[6px] border-2 border-[var(--color-washi)]/30"
                />

                {/* 武 kanji */}
                <span
                  ref={kanjiRef}
                  className="relative font-kanji leading-none text-[var(--color-washi)]"
                  style={{
                    fontSize: "clamp(140px, 17vw, 240px)",
                    textShadow:
                      "0 1px 0 rgba(14,13,12,0.18), 0 0 30px rgba(244,237,225,0.08)",
                  }}
                >
                  武
                </span>

                {/* Top-left corner mark */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-4 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[var(--color-washi)]/60"
                >
                  bu
                </span>
                {/* Bottom-right corner mark */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[var(--color-washi)]/60"
                >
                  AM · 二〇二六
                </span>
              </div>

              {/* Small floating accent dot */}
              <span
                aria-hidden="true"
                className="absolute right-[6%] top-[8%] h-3 w-3 rounded-full bg-[var(--color-shu)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
