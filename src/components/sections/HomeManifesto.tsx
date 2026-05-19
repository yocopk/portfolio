"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeManifesto() {
  const t = useTranslations("home.manifesto");
  const ref = useRef<HTMLElement>(null);
  const brushRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!ref.current || !brushRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = brushRef.current;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len });

    if (reduced) {
      gsap.set(path, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(path, { strokeDashoffset: len });
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 65%",
      end: "bottom 50%",
      scrub: 0.8,
      animation: gsap.to(path, { strokeDashoffset: 0, ease: "none" }),
    });
    return () => trigger.kill();
  }, []);

  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden px-6 py-[var(--space-section)] md:px-10"
    >
      {/* Background ornamental emblems */}
      <JapaneseEmblem
        kind="enso"
        className="absolute -left-20 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 text-[var(--color-sumi)]/4 md:block"
        strokeWidth={1}
      />
      <JapaneseEmblem
        kind="hanabishi"
        className="absolute -right-10 -bottom-20 h-72 w-72 text-[var(--color-shu)]/8 md:h-96 md:w-96"
        strokeWidth={1.2}
      />

      <div
        ref={inViewRef}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.24em] text-[var(--color-shu)]"
        >
          <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--color-shu)]/40" />
          {t("kicker")}
          <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--color-shu)]/40" />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display tracking-[-0.025em] text-[var(--color-sumi)]"
          style={{ fontSize: "var(--text-display)", lineHeight: 0.95 }}
        >
          <span className="block">{t("lineOne")}</span>
          <span className="block italic text-[var(--color-shu)]">{t("lineTwo")}</span>
        </motion.h2>

        {/* Brush stroke decoration */}
        <svg
          viewBox="0 0 400 14"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-2 w-full max-w-xs text-[var(--color-shu)]"
        >
          <path
            ref={brushRef}
            d="M 4 8 C 80 2, 200 12, 320 4 C 360 1, 380 9, 396 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.95, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic tracking-tight text-[var(--color-sumi-soft)]"
          style={{ fontSize: "clamp(1.5rem, 1rem + 1.4vw, 2.25rem)" }}
        >
          — {t("tail")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.95, delay: 0.65 }}
          className="max-w-xl font-mono-ui text-[11px] uppercase leading-relaxed tracking-[0.18em] text-[var(--color-stone)]"
        >
          {t("footnote")}
        </motion.p>
      </div>
    </section>
  );
}
