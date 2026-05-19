"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface KanjiLabelProps {
  glyph: string;
  reading: string;
  label: string;
  meaning?: string;
  align?: "left" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function KanjiLabel({
  glyph,
  reading,
  label,
  meaning,
  align = "left",
  size = "md",
  className,
}: KanjiLabelProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close tooltip on outside click / Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const glyphSize =
    size === "lg"
      ? "text-6xl md:text-7xl"
      : size === "sm"
        ? "text-2xl md:text-3xl"
        : "text-4xl md:text-5xl";

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-baseline gap-3",
        align === "right" && "flex-row-reverse",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label={`${glyph} — ${reading} — ${meaning ?? label}`}
        className={cn(
          "font-kanji leading-none text-[var(--color-shu)] transition-transform duration-300 hover:scale-110 focus-visible:scale-110",
          glyphSize,
        )}
        data-cursor="hover"
      >
        {glyph}
      </button>
      <div className="flex flex-col leading-tight">
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
          {reading}
        </span>
        <span className="font-display text-[15px] tracking-tight text-[var(--color-sumi)]">
          {label}
        </span>
      </div>

      {meaning && (
        <motion.div
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
            y: open ? 0 : -4,
            pointerEvents: open ? "auto" : "none",
          }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute top-full z-30 mt-3 w-max max-w-[16rem] rounded-md border border-[var(--color-sumi)]/8 bg-[var(--color-washi-soft)] px-3 py-2 font-mono-ui text-[11px] leading-relaxed text-[var(--color-sumi)] shadow-[var(--shadow-paper)]",
            align === "right" ? "right-0" : "left-0",
          )}
          role="tooltip"
        >
          <span className="text-[var(--color-shu)]">{glyph}</span>{" "}
          <span className="text-[var(--color-stone)]">·</span>{" "}
          <span>{meaning}</span>
        </motion.div>
      )}
    </div>
  );
}
