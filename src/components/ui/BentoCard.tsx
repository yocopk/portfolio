"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  variant?: "paper" | "ink" | "vermilion";
  span?: string;
  className?: string;
  delay?: number;
  interactive?: boolean;
  as?: "div" | "article" | "section" | "a";
  href?: string;
  ariaLabel?: string;
}

export function BentoCard({
  children,
  variant = "paper",
  span,
  className,
  delay = 0,
  interactive = false,
  as: Tag = "div",
  href,
  ariaLabel,
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const variantClass =
    variant === "ink"
      ? "bento-card bento-card-dark"
      : variant === "vermilion"
        ? "bento-card bento-card-shu"
        : "bento-card";

  const interactiveClass = interactive
    ? "hover:-translate-y-1 hover:shadow-[var(--shadow-paper-lift)] hover:rotate-[-0.2deg]"
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", span, variantClass, interactiveClass, className)}
    >
      {Tag === "a" && href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          className="block h-full w-full"
          data-cursor="hover"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </motion.div>
  );
}
