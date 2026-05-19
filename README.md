# Andrea Marchese — Portfolio

> Personal portfolio for Andrea Marchese, Full Stack developer.
> Built around the **Bento Bushidō** design — bento-grid layout with a sumi-e and washi paper aesthetic. Bilingual EN / IT.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000?style=flat-square&logo=nextdotjs&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-3-88ce02?style=flat-square">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-c8372d?style=flat-square">
</p>

---

## 概要 — Overview

A personal portfolio that takes the aesthetic of Japanese craft seriously. The layout is built from an **asymmetric bento grid** — a direct nod to the partitioned wooden boxes that share the name. Sections are labeled with kanji (我 ware, 技 waza, 業 waza, 道 michi, 縁 en) with the romaji reading and meaning surfaced on hover. Motion is restrained and ink-like: brush strokes, shoji-screen reveals, a single enso on load.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** (strict) |
| Styles | **Tailwind CSS v4** with CSS-first design tokens |
| Motion | **GSAP** + **Lenis** + **Motion** (Framer Motion v12) |
| i18n | **next-intl** with `/en` and `/it` sub-paths |
| Data | **@octokit/rest** for live GitHub stats (cached 1h) |
| Fonts | Fraunces (display), Inter (sans), Geist Mono (UI), Noto Serif JP (kanji) |

## Design tokens

The palette is intentionally restrained:

| Token | Hex | Reading |
|-------|-----|---------|
| `--color-sumi` | `#0e0d0c` | 墨 — sumi ink |
| `--color-washi` | `#f4ede1` | 和紙 — washi paper |
| `--color-shu` | `#c8372d` | 朱色 — shu-iro vermilion |
| `--color-gold` | `#b8956a` | sober gold accent |
| `--color-stone` | `#6b6661` | muted stone gray |

Typography mixes a **variable serif display** (Fraunces with opsz, SOFT and WONK axes) for editorial gravity, a **monospace** for tracked UI labels, and **Noto Serif JP** for kanji — only loaded when actually rendered.

## Getting started

```bash
# Install dependencies (pnpm recommended)
pnpm install

# Run the dev server (with Turbopack)
pnpm dev

# Build for production
pnpm build && pnpm start

# Type-check
pnpm typecheck
```

Open [http://localhost:3000](http://localhost:3000) — the middleware redirects to `/en` by default.

### Environment

Copy `.env.example` to `.env.local` and fill in the (optional) GitHub token:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | Optional — raises rate limit on `/api/github` from 60 to 5000 req/h |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub handle for live stats |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email shown on the site |

## Project structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          ← html + body + i18n provider
│   │   ├── page.tsx            ← composes all sections
│   │   ├── not-found.tsx
│   │   └── opengraph-image.tsx ← dynamic OG card
│   ├── api/
│   │   └── github/route.ts     ← live stats endpoint (ISR 1h)
│   ├── icon.tsx                ← 武 favicon
│   └── globals.css             ← Tailwind v4 + @theme tokens
├── components/
│   ├── layout/                 ← Header, Footer, LanguageSwitcher
│   ├── motion/                 ← SmoothScroll, EnsoLoader, CustomCursor, BrushReveal, ShojiReveal, FadeUp
│   ├── sections/               ← Hero, AboutBento, GitHubStats, Projects, Experience, Contact
│   └── ui/                     ← BentoCard, KanjiLabel, BrushArt
├── content/                    ← projects.ts, experience.ts, skills.ts, social.ts
├── i18n/                       ← routing.ts, request.ts
├── lib/                        ← utils.ts, github.ts, kanji.ts
├── middleware.ts               ← next-intl locale middleware
└── messages/
    ├── en.json                 ← English copy (default)
    └── it.json                 ← Italian copy
```

## Customising

Most personal content lives in `src/content/` — touch nothing else to update:

- **`projects.ts`** — featured work, with bilingual subtitle/description
- **`experience.ts`** — timeline entries
- **`skills.ts`** — tech stack grouped by category
- **`social.ts`** — social handles + primary email
- **`messages/{en,it}.json`** — every translatable string in the UI

## Accessibility

- WCAG AA color contrast across both modes
- Custom cursor disabled on touch / non-fine pointers
- `prefers-reduced-motion` respected — strips parallax, scroll-triggered timelines, and transitions
- Visible vermilion focus rings on every interactive element
- Skip-to-content link, kanji glyphs always paired with romaji + meaning, all icon-only buttons have aria-labels

## Performance

- Variable fonts subset to Latin, Noto Serif JP loaded only on-demand
- Smooth scroll only on devices that can handle it (skipped on touch)
- GSAP and Lenis tied into a single ticker — no double-RAF
- GitHub stats cached via `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`
- Animations use `transform` and `opacity` only

## License

MIT — see [LICENSE](LICENSE).

---

*Designed and built in Italy.*
*Set in Fraunces, Geist Mono, Noto Serif JP. Motion by GSAP and Lenis.*
