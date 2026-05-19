"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BentoCard } from "@/components/ui/BentoCard";
import type { GitHubStats } from "@/lib/github";
import { cn } from "@/lib/utils";

export function GitHubStatsCard({ delay = 0 }: { delay?: number }) {
  const t = useTranslations("stats");
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => r.json())
      .then((data: GitHubStats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics: Array<{ label: string; value: string | number; mono?: boolean }> = stats
    ? [
        { label: t("repos"), value: stats.publicRepos },
        { label: t("stars"), value: stats.totalStars },
        { label: t("followers"), value: stats.followers },
        {
          label: t("topLanguage"),
          value: stats.topLanguage ? `${stats.topLanguage}` : "—",
          mono: true,
        },
      ]
    : Array.from({ length: 4 }).map(() => ({ label: "—", value: "—" }));

  return (
    <BentoCard
      variant="ink"
      span="p-6"
      delay={delay}
      className="h-full"
    >
      <a
        href={stats?.htmlUrl ?? "https://github.com/yocopk"}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="flex h-full flex-col"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-washi)]/60">
            {t("label")} · 統計
          </span>
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-washi)]/10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[var(--color-washi)]">
              <path
                d="M7 17 17 7M17 7H8M17 7v9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <h3
          className="mt-3 font-display leading-tight tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.25rem, 1rem + 1vw, 1.75rem)" }}
        >
          {t("title")}
        </h3>

        <dl className="mt-5 grid flex-1 grid-cols-2 gap-x-4 gap-y-4">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <dt className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-[var(--color-washi)]/55">
                {m.label}
              </dt>
              <dd
                className={cn(
                  "font-display text-2xl tracking-tight",
                  m.mono && "font-mono-ui text-base tracking-normal",
                )}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--color-washi)]/12 pt-3 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-washi)]/55">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-shu)]"
            />
            {error ? t("error") : stats ? `@${stats.username}` : "…"}
          </span>
          <span>{t("updated")}</span>
        </div>
      </a>
    </BentoCard>
  );
}
