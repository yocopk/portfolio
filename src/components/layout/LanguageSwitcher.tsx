"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as "en" | "it" });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("switchTo")}
      className={cn(
        "inline-flex items-center gap-0 rounded-full border border-[var(--color-sumi)]/10 bg-[var(--color-washi-soft)]/80 p-1 font-mono-ui text-[11px] uppercase tracking-[0.16em] backdrop-blur-sm",
        isPending && "opacity-60",
        className,
      )}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={isActive}
            disabled={isActive}
            data-cursor="hover"
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors duration-300",
              isActive
                ? "bg-[var(--color-sumi)] text-[var(--color-washi)]"
                : "text-[var(--color-stone)] hover:text-[var(--color-sumi)]",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
