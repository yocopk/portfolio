"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export function BackHome() {
  const t = useTranslations("a11y");
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
      <Link
        href="/"
        className="link-underline inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)] transition-colors hover:text-[var(--color-sumi)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("backToHome")}
      </Link>
    </div>
  );
}
