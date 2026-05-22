"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { JapaneseEmblem, type EmblemKind } from "@/components/ui/JapaneseEmblem";
import { cn } from "@/lib/utils";

type NavKey = "home" | "about" | "work" | "journey" | "contact";

interface NavItem {
  key: NavKey;
  href: "/" | "/about" | "/work" | "/journey" | "/contact";
  emblem: EmblemKind;
}

const NAV: NavItem[] = [
  { key: "home", href: "/", emblem: "enso" },
  { key: "about", href: "/about", emblem: "sakura" },
  { key: "work", href: "/work", emblem: "seigaiha" },
  { key: "journey", href: "/journey", emblem: "tomoe" },
  { key: "contact", href: "/contact", emblem: "shippo" },
];

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
          scrolled && "bg-[var(--color-washi-soft)]/92",
        )}
      >
        {/* Logo — sumi hanko stamp with 武 kanji */}
        <Link
          href="/"
          aria-label="Andrea Marchese — home"
          className="group flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            className="relative inline-flex h-9 w-9 shrink-0 -rotate-2 items-center justify-center rounded-[3px] bg-[var(--color-sumi)] shadow-[0_2px_10px_rgba(14,13,12,0.28)] transition-transform duration-500 group-hover:rotate-2 group-hover:scale-[1.06]"
          >
            <span className="font-kanji text-[22px] leading-none text-[var(--color-washi)]">
              武
            </span>
            {/* Vermilion accent dot — top right */}
            <span className="pointer-events-none absolute right-[3px] top-[3px] h-1.5 w-1.5 rounded-full bg-[var(--color-shu)]" />
            {/* Inset washi border — stamp feel */}
            <span className="pointer-events-none absolute inset-[3px] rounded-[2px] border border-[var(--color-washi)]/15" />
          </span>
          <span className="hidden font-display text-[15px] tracking-tight text-[var(--color-sumi)] sm:block">
            Andrea Marchese
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-1 font-mono-ui text-[11px] uppercase tracking-[0.16em]">
            {NAV.filter((n) => n.key !== "home").map((n) => (
              <li key={n.key}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-300",
                    isActive(n.href)
                      ? "text-[var(--color-sumi)]"
                      : "text-[var(--color-stone)] hover:text-[var(--color-sumi)]",
                  )}
                >
                  {isActive(n.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--color-sumi)]/6"
                    />
                  )}
                  <span>{t(n.key)}</span>
                  {isActive(n.href) && (
                    <span
                      aria-hidden="true"
                      className="inline-block h-1 w-1 rounded-full bg-[var(--color-shu)]"
                    />
                  )}
                </Link>
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
            className="md:hidden inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-sumi)]/10 bg-[var(--color-washi)]/60 text-[var(--color-sumi)]"
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
          open
            ? "max-h-[28rem] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="p-2">
          <ul className="flex flex-col">
            {NAV.filter((n) => n.key !== "home").map((n) => (
              <li key={n.key}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors duration-200 hover:bg-[var(--color-washi-deep)]/40",
                    isActive(n.href) && "bg-[var(--color-washi-deep)]/40",
                  )}
                >
                  <JapaneseEmblem
                    kind={n.emblem}
                    className="h-7 w-7 text-[var(--color-sumi)]/70 transition-colors group-hover:text-[var(--color-shu)]"
                  />
                  <span className="font-display text-lg tracking-tight text-[var(--color-sumi)]">
                    {t(n.key)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
