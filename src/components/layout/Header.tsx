"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", kanji: "我" },
  { id: "skills", kanji: "技" },
  { id: "work", kanji: "業" },
  { id: "journey", kanji: "道" },
  { id: "contact", kanji: "縁" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-above-grain
      className={cn(
        "fixed inset-x-3 top-3 z-40 transition-all duration-500 ease-[var(--ease-zen)] md:inset-x-6 md:top-6",
        scrolled && "md:top-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[var(--color-sumi)]/8 bg-[var(--color-washi-soft)]/75 px-3 py-2 shadow-[var(--shadow-paper)] backdrop-blur-md transition-all duration-500 md:px-5 md:py-2.5",
          scrolled && "bg-[var(--color-washi-soft)]/90",
        )}
      >
        {/* Logo: 武 + name */}
        <a
          href="#top"
          aria-label="Andrea Marchese — home"
          className="group flex items-center gap-2.5"
          data-cursor="hover"
        >
          <span
            aria-hidden="true"
            className="font-kanji text-2xl leading-none text-[var(--color-shu)] transition-transform duration-500 group-hover:rotate-[-6deg]"
          >
            武
          </span>
          <span className="hidden font-display text-[15px] tracking-tight text-[var(--color-sumi)] sm:block">
            Andrea Marchese
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-1 font-mono-ui text-[11px] uppercase tracking-[0.16em]">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-cursor="hover"
                  className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[var(--color-stone)] transition-colors duration-300 hover:text-[var(--color-sumi)]"
                >
                  <span
                    aria-hidden="true"
                    className="font-kanji text-base leading-none text-[var(--color-sumi)]/40 transition-colors group-hover:text-[var(--color-shu)]"
                  >
                    {s.kanji}
                  </span>
                  <span>{t(s.id as "about" | "skills" | "work" | "journey" | "contact")}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            data-cursor="hover"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-sumi)]/10 bg-[var(--color-washi)]/60 text-[var(--color-sumi)]"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 right-0 top-0 h-[1.5px] origin-center bg-current transition-transform duration-300",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 right-0 bottom-0 h-[1.5px] origin-center bg-current transition-transform duration-300",
                  open && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-[var(--color-sumi)]/10 bg-[var(--color-washi-soft)]/95 shadow-[var(--shadow-paper)] backdrop-blur-md transition-[max-height,opacity] duration-500 ease-[var(--ease-zen)] md:hidden",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="p-2">
          <ul className="flex flex-col">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-3 rounded-2xl px-4 py-3 text-[var(--color-sumi)] transition-colors duration-200 hover:bg-[var(--color-washi-deep)]/40"
                  data-cursor="hover"
                >
                  <span
                    aria-hidden="true"
                    className="font-kanji text-2xl leading-none text-[var(--color-shu)]"
                  >
                    {s.kanji}
                  </span>
                  <span className="font-display text-lg tracking-tight">
                    {t(s.id as "about" | "skills" | "work" | "journey" | "contact")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
