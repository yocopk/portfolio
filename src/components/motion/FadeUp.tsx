"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function FadeUp({
  children,
  className,
  delay = 0,
  distance = 24,
  duration = 0.8,
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: distance, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
