"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";
import type { GitHubStats } from "@/lib/github";

export function HomePulse() {
  const t = useTranslations("home.pulse");
  const tStats = useTranslations("stats");
  const items = t.raw("items") as string[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => r.json())
      .then((data: GitHubStats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        {/* Now — the main card */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="bento-card bento-card-shu relative col-span-1 overflow-hidden p-7 md:col-span-8 md:p-10"
        >
          <JapaneseEmblem
            kind="seigaiha"
            className="absolute -right-8 -top-8 h-48 w-48 text-[var(--color-washi)]/12"
            strokeWidth={2}
          />
          <div className="relative flex flex-col gap-5">
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-washi)]/70">
              {t("label")}
            </span>
            <p
              className="font-display leading-[1.05] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.75rem, 1rem + 2.5vw, 2.75rem)" }}
            >
              {t("title")}
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--color-washi)]/85">
              {items.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-[var(--color-washi)]/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* GitHub stats — ink card */}
        <motion.a
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          href={stats?.htmlUrl ?? "https://github.com/yocopk"}
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card bento-card-dark group relative col-span-1 overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1 md:col-span-4"
        >
          <JapaneseEmblem
            kind="shippo"
            className="absolute -right-6 -bottom-6 h-32 w-32 text-[var(--color-washi)]/10"
            strokeWidth={1.5}
          />
          <div className="relative flex h-full flex-col gap-4">
            <div className="flex items-start justify-between">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-washi)]/60">
                {tStats("label")}
              </span>
              <span aria-hidden="true" className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </div>
            <h3
              className="font-display leading-tight tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.15rem, 1rem + 0.6vw, 1.4rem)" }}
            >
              {tStats("title")}
            </h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Metric label={tStats("repos")} value={stats?.publicRepos ?? "—"} />
              <Metric label={tStats("stars")} value={stats?.totalStars ?? "—"} />
              <Metric label={tStats("followers")} value={stats?.followers ?? "—"} />
              <Metric
                label={tStats("topLanguage")}
                value={stats?.topLanguage ?? "—"}
                small
              />
            </dl>
            <div className="mt-auto flex items-center gap-2 border-t border-[var(--color-washi)]/12 pt-3 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-washi)]/55">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-shu)]" />
              {stats ? `@${stats.username}` : "…"}
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  small,
}: {
  label: string;
  value: string | number;
  small?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-[var(--color-washi)]/55">
        {label}
      </dt>
      <dd
        className={
          small
            ? "font-mono-ui text-sm tracking-normal"
            : "font-display text-2xl tracking-tight"
        }
      >
        {value}
      </dd>
    </div>
  );
}
