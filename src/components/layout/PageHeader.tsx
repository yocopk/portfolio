"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { JapaneseEmblem, type EmblemKind } from "@/components/ui/JapaneseEmblem";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  emblem: EmblemKind;
  kicker: string;
  title: string;
  lead?: string;
  number?: string;
  className?: string;
}

/**
 * Reusable page-level header shown at the top of /about, /work, /journey, /contact.
 * Big emblem, kicker, large display title, optional lead.
 */
export function PageHeader({
  emblem,
  kicker,
  title,
  lead,
  number,
  className,
}: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <header
      ref={ref}
      className={cn(
        "relative px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-12",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:grid md:grid-cols-12 md:gap-12">
        {/* Emblem column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-3"
        >
          <JapaneseEmblem
            kind={emblem}
            className="h-28 w-28 text-[var(--color-sumi)] md:h-40 md:w-40"
            strokeWidth={1.3}
          />
        </motion.div>

        {/* Title column */}
        <div className="md:col-span-9 md:pl-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-3"
          >
            {number && (
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-[var(--color-stone)]">
                {number}
              </span>
            )}
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-[var(--color-shu)]">
              · {kicker}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={
              inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
            }
            transition={{ duration: 1.05, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-display tracking-[-0.025em] text-[var(--color-sumi)]"
            style={{ fontSize: "var(--text-hero)", lineHeight: 0.86 }}
          >
            {title}
          </motion.h1>

          {lead && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-[var(--color-sumi-soft)]"
              style={{ fontSize: "var(--text-lead)" }}
            >
              {lead}
            </motion.p>
          )}

          {/* Brush stroke divider */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewBox="0 0 400 12"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="mt-8 block h-2 w-full max-w-sm text-[var(--color-shu)]"
          >
            <path
              d="M 4 6 C 60 2, 140 10, 220 5 C 280 1, 340 9, 396 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
      </div>
    </header>
  );
}
