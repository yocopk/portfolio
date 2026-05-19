"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";

export function AboutContent() {
  const t = useTranslations("about");
  const tv = useTranslations("about.values");
  const body = t.raw("body") as string[];
  const values = tv.raw("items") as Array<{ title: string; body: string }>;

  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, amount: 0.1 });

  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Body paragraphs */}
        <div
          ref={bodyRef}
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12"
        >
          <div className="md:col-span-3" />
          <div className="md:col-span-9 md:pl-2">
            <div className="flex max-w-3xl flex-col gap-5">
              {body.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={bodyInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.85,
                    delay: 0.08 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-[var(--color-sumi-soft)]"
                  style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Values cards */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3">
                <JapaneseEmblem
                  kind="asanoha"
                  className="h-8 w-8 text-[var(--color-sumi)]"
                />
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                  {tv("label")}
                </span>
              </div>
            </div>
            <div className="md:col-span-9 md:pl-2">
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                {values.map((v, i) => (
                  <ValueCard key={i} title={v.title} body={v.body} index={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: 0.85, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card flex flex-col gap-3 p-6"
    >
      <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-shu)]">
        0{index + 1}
      </span>
      <h3
        className="font-display tracking-[-0.01em] text-[var(--color-sumi)]"
        style={{ fontSize: "clamp(1.25rem, 1rem + 0.6vw, 1.5rem)" }}
      >
        {title}
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--color-sumi-soft)]">
        {body}
      </p>
    </motion.li>
  );
}
