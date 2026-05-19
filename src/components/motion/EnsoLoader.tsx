"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SESSION_KEY = "portfolio-enso-seen";

export function EnsoLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ms = reduced ? 200 : 1500;
    const t = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
    }, ms);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="enso"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-washi)]"
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            className="text-[var(--color-sumi)]"
            aria-hidden="true"
          >
            <motion.circle
              cx="110"
              cy="110"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE, rotate: -90 }}
              animate={{
                strokeDashoffset: CIRCUMFERENCE * 0.04,
                rotate: -90,
              }}
              transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
              style={{ transformOrigin: "110px 110px" }}
            />
            <motion.circle
              cx="180"
              cy="118"
              r="3"
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.05, duration: 0.2 }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
