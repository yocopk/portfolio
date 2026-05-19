"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface BrushRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * Splits children text into characters and animates them in
 * with a slight rotation + vertical brush stroke — like ink hitting paper.
 */
export function BrushReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: BrushRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Convert children to plain text safely.
  const text = typeof children === "string" ? children : String(children ?? "");
  const words = text.split(" ");

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      ref={ref as never}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {Array.from(word).map((char, ci) => {
            const totalIndex = wi * 4 + ci;
            return (
              <motion.span
                key={`${char}-${ci}`}
                className="inline-block will-change-transform"
                initial={{ y: "0.7em", opacity: 0, rotate: 3, filter: "blur(8px)" }}
                animate={
                  inView
                    ? { y: 0, opacity: 1, rotate: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: 0.9,
                  delay: delay + totalIndex * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && (
            <span className="inline-block w-[0.25em]" aria-hidden="true">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * SVG brush stroke under or above text — animated dash-offset.
 * Place as a sibling to your headline.
 */
export function BrushStroke({
  className,
  color = "var(--color-shu)",
  delay = 0,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!inView || !pathRef.current) return;
    const p = pathRef.current;
    const len = p.getTotalLength();
    p.style.setProperty("--len", `${len}`);
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      p.style.transition = `stroke-dashoffset 1400ms cubic-bezier(0.7,0,0.3,1) ${delay}ms`;
      p.style.strokeDashoffset = "0";
    });
  }, [inView, delay]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      className={cn("block w-full", className)}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M 6 22 C 80 8, 180 32, 280 18 C 380 4, 480 28, 594 14"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
