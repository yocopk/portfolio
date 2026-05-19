import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-24">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <span
          aria-hidden="true"
          className="font-kanji text-7xl text-[var(--color-shu)]"
        >
          無
        </span>
        <p className="font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
          404 · mu · nothing
        </p>
        <h1
          className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
          style={{ fontSize: "var(--text-heading)" }}
        >
          The path leads nowhere.
        </h1>
        <p className="text-[var(--color-sumi-soft)]">
          This page does not exist — or it once did, and like all things, has passed.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-sumi)] px-5 py-2.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-washi)] transition-transform hover:scale-[1.03]"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
