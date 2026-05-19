import { useTranslations } from "next-intl";
import { social } from "@/content/social";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--color-sumi)]/8 bg-[var(--color-washi)]/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex items-start gap-4">
          {/* Final enso mark */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 100 100"
            className="text-[var(--color-shu)]"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="220 12"
              transform="rotate(-95 50 50)"
            />
          </svg>
          <div className="flex flex-col gap-1">
            <p className="font-display text-lg tracking-tight text-[var(--color-sumi)]">
              {t("made")}
            </p>
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--color-stone)]">
              © {year} Andrea Marchese · {t("rights")}
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--color-stone)]">
          {social.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target={s.id !== "email" ? "_blank" : undefined}
                rel={s.id !== "email" ? "noopener noreferrer" : undefined}
                className="transition-colors duration-200 hover:text-[var(--color-shu)]"
                data-cursor="hover"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl border-t border-[var(--color-sumi)]/6 px-6 py-5 md:px-10">
        <p className="font-mono-ui text-[10px] leading-relaxed tracking-[0.14em] text-[var(--color-stone-light)] uppercase">
          {t("colophon")}
        </p>
      </div>
    </footer>
  );
}
