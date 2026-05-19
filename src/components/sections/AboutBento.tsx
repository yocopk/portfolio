import { useTranslations } from "next-intl";
import { BentoCard } from "@/components/ui/BentoCard";
import { KanjiLabel } from "@/components/ui/KanjiLabel";
import { GitHubStatsCard } from "@/components/sections/GitHubStats";
import { skills } from "@/content/skills";

export function AboutBento() {
  const tAbout = useTranslations("about");
  const tSkills = useTranslations("skills");

  return (
    <section
      id="about"
      className="relative px-6 py-[var(--space-section)] md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* ─── ROW 1: About + Now/Status + Stats teaser ─────────────── */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {/* ABOUT — large card spanning 8/12 */}
          <BentoCard span="col-span-12 md:col-span-8 md:row-span-2 p-7 md:p-10">
            <div className="flex h-full flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <KanjiLabel
                  glyph={tAbout("kanji")}
                  reading={tAbout("reading")}
                  label={tAbout("label")}
                  meaning="self · I"
                  size="lg"
                />
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
                  01 — i
                </span>
              </div>

              <h2
                className="font-display tracking-[-0.02em] text-[var(--color-sumi)]"
                style={{ fontSize: "var(--text-heading)" }}
              >
                {tAbout("title")}
              </h2>

              <p
                className="max-w-2xl text-[var(--color-sumi-soft)]"
                style={{ fontSize: "var(--text-lead)" }}
              >
                {tAbout("body")}
              </p>

              <p className="mt-auto font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
                <span className="text-[var(--color-shu)]">→</span>{" "}
                {tAbout("footnote")}
              </p>
            </div>
          </BentoCard>

          {/* NOW — vermilion card */}
          <BentoCard
            variant="vermilion"
            span="col-span-12 sm:col-span-6 md:col-span-4 p-7"
            delay={0.1}
          >
            <div className="flex h-full flex-col">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-washi)]/70">
                Now · 今
              </span>
              <p
                className="mt-3 font-display leading-[1.1] tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.5rem, 1rem + 1.5vw, 2.1rem)" }}
              >
                Building MogHouse&nbsp;— a community for FFXIV players.
              </p>
              <ul className="mt-auto space-y-1.5 pt-6 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--color-washi)]/85">
                <li>· Listening to: Lo-fi shamisen</li>
                <li>· Reading: &ldquo;Hagakure&rdquo;</li>
                <li>· Training: Hiragana → Katakana</li>
              </ul>
            </div>
          </BentoCard>

          {/* STATS — live GitHub */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <GitHubStatsCard delay={0.2} />
          </div>
        </div>

        {/* ─── ROW 2: Skills 技 ─────────────────────────────────────── */}
        <div id="skills" className="mt-4 grid grid-cols-12 gap-4 md:mt-5 md:gap-5">
          <BentoCard span="col-span-12 p-7 md:p-10" delay={0.05}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <KanjiLabel
                  glyph={tSkills("kanji")}
                  reading={tSkills("reading")}
                  label={tSkills("label")}
                  meaning="technique · skill"
                  size="lg"
                />
                <h3
                  className="font-display italic tracking-[-0.02em] text-[var(--color-sumi)]"
                  style={{ fontSize: "var(--text-heading)" }}
                >
                  {tSkills("title")}
                </h3>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone)]">
                  02 — ii
                </span>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
                {(["frontend", "backend", "data", "ops"] as const).map((cat, idx) => (
                  <div key={cat} className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between border-b border-[var(--color-sumi)]/10 pb-2">
                      <span className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[var(--color-stone)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base tracking-tight text-[var(--color-sumi)]">
                        {tSkills(`categories.${cat}`)}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {skills[cat].map((s) => (
                        <li
                          key={s.name}
                          className="group flex items-center justify-between gap-2 text-sm text-[var(--color-sumi-soft)]"
                        >
                          <span className="transition-colors duration-200 group-hover:text-[var(--color-shu)]">
                            {s.name}
                          </span>
                          <span
                            aria-hidden="true"
                            className="flex gap-0.5"
                            title={`Proficiency ${s.level}/3`}
                          >
                            {Array.from({ length: 3 }).map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < s.level
                                    ? "h-1 w-3 rounded-full bg-[var(--color-sumi)]"
                                    : "h-1 w-3 rounded-full bg-[var(--color-sumi)]/15"
                                }
                              />
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
