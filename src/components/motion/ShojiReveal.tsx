"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface ShojiRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  delay?: number;
}

/**
 * Shoji-screen reveal: child is masked behind two panels that slide apart,
 * exposing the content underneath like sliding paper doors.
 */
export function ShojiReveal({
  children,
  className,
  direction = "horizontal",
  delay = 0,
}: ShojiRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const panelOneVariants =
    direction === "horizontal"
      ? { initial: { x: "0%" }, animate: { x: "-101%" } }
      : { initial: { y: "0%" }, animate: { y: "-101%" } };
  const panelTwoVariants =
    direction === "horizontal"
      ? { initial: { x: "0%" }, animate: { x: "101%" } }
      : { initial: { y: "0%" }, animate: { y: "101%" } };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        {children}
      </motion.div>

      {/* Top / left panel */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-[var(--color-sumi)]",
          direction === "horizontal" ? "origin-left" : "origin-top",
        )}
        style={
          direction === "horizontal"
            ? { clipPath: "inset(0 50% 0 0)" }
            : { clipPath: "inset(0 0 50% 0)" }
        }
        initial={panelOneVariants.initial}
        animate={inView ? panelOneVariants.animate : undefined}
        transition={{
          duration: 0.95,
          ease: [0.7, 0, 0.3, 1],
          delay,
        }}
      />
      {/* Bottom / right panel */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-[var(--color-sumi)]",
          direction === "horizontal" ? "origin-right" : "origin-bottom",
        )}
        style={
          direction === "horizontal"
            ? { clipPath: "inset(0 0 0 50%)" }
            : { clipPath: "inset(50% 0 0 0)" }
        }
        initial={panelTwoVariants.initial}
        animate={inView ? panelTwoVariants.animate : undefined}
        transition={{
          duration: 0.95,
          ease: [0.7, 0, 0.3, 1],
          delay,
        }}
      />
    </div>
  );
}
