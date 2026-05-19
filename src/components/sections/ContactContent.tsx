"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { JapaneseEmblem } from "@/components/ui/JapaneseEmblem";
import { primaryEmail, social } from "@/content/social";

export function ContactContent() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(primaryEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Big email card */}
          <div className="relative col-span-1 overflow-hidden rounded-3xl bg-[var(--color-sumi)] p-7 text-[var(--color-washi)] md:col-span-8 md:p-12">
            <JapaneseEmblem
              kind="enso"
              className="absolute -right-14 -top-14 h-[26rem] w-[26rem] text-[var(--color-washi)]/8"
              strokeWidth={1.2}
            />
            <div className="relative flex flex-col gap-6">
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-washi)]/60">
                Primary channel
              </span>
              <p
                className="font-display tracking-[-0.02em]"
                style={{ fontSize: "var(--text-heading)", lineHeight: 1.05 }}
              >
                The fastest way to reach me is just an email.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`mailto:${primaryEmail}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-shu)] px-5 py-3.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--color-washi)] transition-transform duration-300 hover:scale-[1.03]"
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
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-washi)]/15 bg-[var(--color-washi)]/5 px-5 py-3 font-mono-ui text-xs uppercase tracking-[0.18em] text-[var(--color-washi)]/85 transition-colors hover:bg-[var(--color-washi)]/10"
                >
                  <motion.span
                    key={copied ? "check" : "copy"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </motion.span>
                  {copied ? t("copied") : t("copy")}
                </button>
              </div>

              <p className="mt-2 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-washi)]/55">
                · {t("responseTime")}
              </p>
            </div>
          </div>

          {/* Social card */}
          <div className="bento-card relative col-span-1 overflow-hidden p-7 md:col-span-4 md:p-10">
            <JapaneseEmblem
              kind="shippo"
              className="absolute -right-10 -bottom-10 h-56 w-56 text-[var(--color-sumi)]/8"
              strokeWidth={1.4}
            />
            <div className="relative flex h-full flex-col gap-5">
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
                {t("social")}
              </span>

              <ul className="flex flex-col gap-5">
                {social
                  .filter((s) => s.id !== "email")
                  .map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-0.5"
                      >
                        <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
                          {s.label}
                        </span>
                        <span className="flex items-center gap-1.5 font-display text-xl tracking-tight text-[var(--color-sumi)] transition-colors group-hover:text-[var(--color-shu)]">
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
