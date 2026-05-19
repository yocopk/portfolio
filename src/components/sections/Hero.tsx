"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

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
  const kanjiPathRef = useRef<SVGPathElement>(null);
  const brushPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-char]", rootRef.current!);

      if (reduced) {
        gsap.set(chars, { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" });
      } else {
        gsap.set(chars, { opacity: 0, y: "0.7em", rotate: 3, filter: "blur(8px)" });

        const tl = gsap.timeline({ delay: 1.4 });

        tl.to(chars, {
          opacity: 1,
          y: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          stagger: { each: 0.035, from: "start" },
        });

        // Brush stroke under headline
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

        // Kanji stroke reveal
        const kanji = kanjiPathRef.current;
        if (kanji) {
          const len = kanji.getTotalLength();
          gsap.set(kanji, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(
            kanji,
            { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" },
            "-=1.4",
          );
        }
      }

      // Subtle parallax on the kanji as the user scrolls
      if (!reduced) {
        gsap.to("[data-hero-kanji]", {
          yPercent: -18,
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
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "30% top",
            scrub: 0.4,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32"
    >
      {/* Subtle asanoha pattern in background */}
      <div
        aria-hidden="true"
        className="asanoha pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        {/* Top meta row */}
        <motion.div
          data-hero-meta
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between gap-4 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]"
        >
          <span>武芸 / Bugei · Portfolio · MMXXVI</span>
          <span className="hidden md:inline">{t("based")} — 41.9°N, 12.5°E</span>
        </motion.div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-sumi)]/10 bg-[var(--color-washi-soft)]/70 px-3 py-1.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-sumi)] shadow-[var(--shadow-paper)] backdrop-blur-sm"
        >
          <span
            aria-hidden="true"
            className="relative inline-flex h-2 w-2"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-shu)]/60" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--color-shu)]" />
          </span>
          {t("status")}
        </motion.div>

        {/* Main grid: name on the left, kanji on the right */}
        <div className="mt-10 grid flex-1 grid-cols-1 items-center gap-10 md:mt-14 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <h1
              aria-label="Andrea Marchese"
              className="font-display leading-[0.85] tracking-[-0.03em] text-[var(--color-sumi)]"
              style={{ fontSize: "var(--text-hero)" }}
            >
              <span className="block overflow-hidden pb-[0.05em]">{splitWord("Andrea")}</span>
              <span className="block overflow-hidden pb-[0.05em] pl-[0.05em] italic">
                {splitWord("Marchese")}
              </span>
            </h1>

            {/* Brush stroke under the name */}
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
              className="mt-8 font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)]"
            >
              <span className="text-[var(--color-sumi)]">{t("role")}</span>
              <span className="mx-2 text-[var(--color-shu)]">·</span>
              {t("based")}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl font-display text-2xl leading-[1.25] tracking-tight text-[var(--color-sumi)] md:text-3xl"
            >
              <span className="italic">{t("tagline")}</span>{" "}
              <span className="text-[var(--color-stone)]">{t("intro")}</span>
            </motion.p>
          </div>

          {/* 武 kanji — stroke reveal */}
          <div
            data-hero-kanji
            className="relative hidden h-full items-center justify-center md:flex"
          >
            <svg
              viewBox="0 0 200 200"
              className="h-[clamp(220px,30vw,420px)] w-[clamp(220px,30vw,420px)] text-[var(--color-sumi)]"
              aria-hidden="true"
            >
              {/* Hanko-like square frame */}
              <rect
                x="14"
                y="14"
                width="172"
                height="172"
                rx="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeOpacity="0.18"
              />
              {/* Simplified 武 — multi-stroke calligraphic path */}
              <path
                ref={kanjiPathRef}
                d="
                  M 100 32 L 100 56
                  M 60 44 L 144 44
                  M 56 78 L 152 78
                  M 100 78 L 100 168
                  M 60 110 C 80 116, 110 116, 144 110
                  M 144 110 L 144 152
                  M 60 168 L 144 168
                  M 130 36 L 158 70
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Hanko stamp accent in the corner */}
              <rect
                x="148"
                y="148"
                width="36"
                height="36"
                rx="2"
                className="fill-[var(--color-shu)]"
              />
              <text
                x="166"
                y="172"
                textAnchor="middle"
                className="font-kanji fill-[var(--color-washi)]"
                fontSize="20"
              >
                武
              </text>
            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mt-10 flex items-end justify-between gap-4 md:mt-16"
        >
          <a
            href="#about"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] transition-colors hover:text-[var(--color-sumi)]"
          >
            <span
              aria-hidden="true"
              className={cn(
                "relative inline-flex h-9 w-[1px] overflow-hidden bg-[var(--color-sumi)]/20",
              )}
            >
              <span className="absolute inset-x-0 top-0 h-1/2 origin-top animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-[var(--color-shu)]" />
            </span>
            {t("scroll")}
          </a>
          <div className="hidden font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)] md:block">
            i — vi
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll-cue {
          0%, 100% { transform: scaleY(0.15); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
