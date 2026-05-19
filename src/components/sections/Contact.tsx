"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { KanjiLabel } from "@/components/ui/KanjiLabel";
import { social, primaryEmail } from "@/content/social";

export function ContactSection() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(primaryEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // graceful no-op
    }
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-[var(--space-section)] md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-sumi)] px-7 py-16 text-[var(--color-washi)] md:px-16 md:py-24">
          {/* Decorative seigaiha pattern in corner */}
          <div
            aria-hidden="true"
            className="seigaiha absolute -right-10 -top-10 h-64 w-64 rotate-12 opacity-[0.07]"
          />
          {/* Hanko stamp top-left */}
          <div
            aria-hidden="true"
            className="absolute left-8 top-8 hidden md:block"
          >
            <div className="relative h-16 w-16 rotate-[-8deg] rounded-md bg-[var(--color-shu)] shadow-[0_4px_16px_rgba(200,55,45,0.4)]">
              <span className="absolute inset-0 flex items-center justify-center font-kanji text-3xl text-[var(--color-washi)]">
                縁
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-8">
            <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-washi)]/60">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--color-shu)]" />
              <span>05 — V</span>
              <span>{t("label")}</span>
            </div>

            <h2
              className="max-w-3xl font-display tracking-[-0.02em] text-[var(--color-washi)]"
              style={{ fontSize: "var(--text-display)", lineHeight: 0.92 }}
            >
              {t("title")}
            </h2>

            <p
              className="max-w-2xl text-[var(--color-washi)]/75"
              style={{ fontSize: "var(--text-lead)" }}
            >
              {t("intro")}
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={`mailto:${primaryEmail}`}
                data-cursor="hover"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-shu)] px-6 py-3.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-washi)] transition-transform duration-300 hover:scale-[1.03]"
              >
                <span>{t("emailMe")}</span>
                <span className="font-display text-base normal-case tracking-tight">
                  {primaryEmail}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-label={t("copy")}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-washi)]/15 bg-[var(--color-washi)]/5 px-5 py-3 font-mono-ui text-xs uppercase tracking-[0.18em] text-[var(--color-washi)]/80 transition-colors hover:bg-[var(--color-washi)]/10"
              >
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </motion.span>
                {copied ? t("copied") : t("copy")}
              </button>
            </div>

            {/* Social links */}
            <div className="mt-6 flex flex-col gap-4 border-t border-[var(--color-washi)]/10 pt-8">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-washi)]/55">
                {t("social")}
              </span>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {social
                  .filter((s) => s.id !== "email")
                  .map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="group flex flex-col gap-0.5"
                      >
                        <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-washi)]/55">
                          {s.label}
                        </span>
                        <span className="flex items-center gap-1.5 font-display text-xl tracking-tight text-[var(--color-washi)] transition-colors group-hover:text-[var(--color-shu-faint)]">
                          {s.username}
                          <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60" />
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
