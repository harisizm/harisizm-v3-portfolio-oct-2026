# V2 Repo Context

Technical facts about the portfolio V2 repository, recorded 2026-10-27 before
that folder was deleted.

---

## Identity

- **Repo:** https://github.com/harisizm/Haris-s-Portfolio-V2
- **Local path (now deleted):** `C:\Users\eng02\Desktop\Haris-s-Portfolio-V2`
- **package name:** `portfolio-site-2`, version `0.1.0`, private
- **Live deployment:** https://haris-portfolio-v2.vercel.app/
- **Branch:** `main` only
- **Total commits:** 19
- **Working tree at archive time:** clean
- **Repo size on disk:** 21 MB (~8 MB images; `node_modules` was not present)

## V2 README, verbatim

> # Portfolio V2
>
> A visual masterpiece designed to showcase skills and projects with smooth
> animations, interactive transitions, and a layout that guides the viewer
> effortlessly.
>
> ## 💻 Tech Stack
> - **Framework:** Next.js + React (TypeScript)
> - **Styling:** Tailwind CSS + Framer Motion
> - **Core:** HTML + CSS + JavaScript
>
> ## 🔗 Live Demo
> [View Live Portfolio](https://haris-portfolio-v2.vercel.app/)

## Dependency list (as shipped)

```json
"dependencies": {
  "@svgr/webpack": "^8.1.0",
  "framer-motion": "^11.3.21",
  "next": "14.2.5",
  "react": "^18",
  "react-dom": "^18",
  "tailwind-merge": "^2.4.0"
},
"devDependencies": {
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "autoprefixer": "^10.4.20",
  "eslint": "^8",
  "eslint-config-next": "14.2.5",
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

Scripts were the Next defaults: `dev`, `build`, `start`, `lint`.

**Six runtime dependencies total** — lean, and worth noting as a baseline. V2
had no UI library, no animation library beyond Framer Motion, no form handling,
no analytics, no CMS, no test framework of any kind.

Next 14.2.5 and Tailwind 3.4 are both a major version behind current. V3 starts
on Next 15+ / Tailwind 4 and should decide App Router + RSC posture up front
rather than inheriting V2's blanket `'use client'` habit (6 of 8 sections were
client components, several only because of a hover state).

## Architecture

```
src/
├── app/           layout.tsx, page.tsx, globals.css, favicon.ico
├── sections/      8 section components (Hero 529L, Projects 240L, About 218L,
│                  Contact 153L, EducationAndCertification 84L, Footer 51L,
│                  Header 34L, Experience 44L)
├── components/    Card, CardHeader, SectionHeader, HeroOrbit, ToolboxItems,
│                  TechIcon, ScrollToTop  (~210L total)
├── utils/         smoothScroll.ts
└── assets/        icons/ (6 SVGs + 2 TSX), images/, project images/, docs/
public/            assets/docs/cv.pdf, assets/coursera-cert.pdf,
                   assets/images/, book_options/ (unused), next.svg, vercel.svg
```

~1,590 lines of TSX across sections and components. Single page, no routes
beyond `/`.

**Section render order in `page.tsx`:**
Hero → Projects → EducationAndCertification → Experience → About → Contact →
Footer.

## Build configuration worth remembering

Not carried into this folder as files, but recorded here because both were
load-bearing:

1. **SVGR webpack setup** (`next.config.mjs`) — let the codebase
   `import StarIcon from './star.svg'` and use it as a React component, with
   `?url` as an escape hatch for URL imports and `removeViewBox: false` so the
   icons stayed scalable. If V3 wants the same ergonomics, this config is the
   pattern; the `@svgr/webpack` dependency is what pays for it.
2. **Remote image allowlist** (`next.config.mjs`) — `cdn.jsdelivr.net` under
   `/gh/devicons/devicon/**`, required because the whole toolbox and every
   project tech badge loaded icons from that CDN at runtime. See
   `skills.md` for why V3 should vendor these instead.

Tailwind's config defined three breakpoints only (`sm: 375px`, `md: 768px`,
`lg: 1024px`), a centred container capped at `lg:max-w-5xl`, CSS-variable font
families (`--font-sans` / `--font-serif`), and four custom animations:
`ping-large`, `move-left`, `move-right`, `spin-slow`.

Fonts: **Inter** (sans) and **Calistoga** (serif, 400 only), both via
`next/font/google`.

## Commit history

Two distinct build phases, nine months apart.

### Phase 1 — initial build, June 2025 (from a template)

| Date | Commit | Message |
|---|---|---|
| 2025-06-22 | `e4207a8` | Initial commit |
| 2025-06-24 | `449b4e2` | initial template setup files |
| 2025-06-25 | `16467c7` | Header+Hero Section completed |
| 2025-06-26 | `b99e5cc` | FEATURED PROJECTS SECTION+ TAPE |
| 2025-06-26 | `4c92337` | testimonials and about section |
| 2025-06-27 | `02e18a6` | ALL SECTIONS DONE-animations next |
| 2025-06-27 | `6de92d6` | animations of all sections |
| 2025-06-27 | `b02dc56` | personalization |
| 2025-06-27 | `f3435aa` | deploy fix 1 |
| 2025-06-27 | `bba3413` | Update README.md |
| 2025-06-27 | `ca1639b` | deploy fix 2 |
| 2025-06-27 | `6457b79` | Merge branch 'main' |
| 2025-06-27 | `8d1825c` | Update Projects.tsx |
| 2025-07-11 | `43b6e35` | fixed footer section |

### Phase 2 — redesign, Aug 2025 → Mar 2026

| Date | Commit | Message |
|---|---|---|
| 2025-08-19 | `e1db647` | new project add, plus update testimonial about and hero sections, full fresh re design |
| 2026-02-10 | `2ead69b` | implement initial portfolio website structure, sections, components, and assets, along with a Tailwind CSS configuration update |
| 2026-02-10 | `cf97d70` | Implement Hero and Projects sections, introduce a TechIcon component, and configure Next.js to allow remote images for icons |
| 2026-02-13 | `75ba968` | Implement new Contact, Footer, and Hero sections and add resume PDF document |
| 2026-03-11 | `bf5c704` | add initial Hero and Footer sections, including CV document assets |

### What the history tells us

- **V2 was built from a template**, not from scratch (`449b4e2`). The orbit
  decorations, memoji avatars, grain texture, "tape" marquee and the general
  card language came from that template — which is why the site reads as generic
  despite the "personalization" commit. V3 is the chance to own the design.
- **A "testimonials" section once existed** (`4c92337`, `e1db647`) and was later
  removed. No testimonial content survives in the final source. If V3 wants
  social proof, it has to be gathered fresh.
- **The whole site was already redesigned once** (`e1db647`, Aug 2025), then
  substantially rebuilt again across Feb–Mar 2026. V3 is the third pass over
  this material. The recurring pattern is rebuilding the shell rather than
  fixing structural problems — which is exactly what `v2-post-mortem.md` is for.
- **Animations were bolted on after layout** (`02e18a6` → `6de92d6`), which
  shows in the result: motion decorates the page rather than communicating
  anything.
- The last three months of commits (Feb–Mar 2026) touch Hero and Footer
  repeatedly — the hero was never settled, consistent with the 529-line file it
  grew into.
- Commit hygiene drifted from terse ("deploy fix 2") to AI-generated verbose.
  Worth setting a convention for V3 at the start.

## Things deliberately left behind

Not copied into this folder:

- `tailwind.config.ts`, `globals.css`, `next.config.mjs`, `tsconfig.json`,
  `.eslintrc.json`, `package.json` / `package-lock.json` — the key values are
  recorded above instead.
- The 6 icon SVGs and the hand-written `StripeIcon.tsx` / `CloudinaryIcon.tsx`.
- `public/book_options/` (3 unused book covers), `memoji-avatar-1/3/4/5.png`,
  `memoji.jpg`, `next.svg`, `vercel.svg` — all unreferenced in the final source.
- `favicon.ico` (the Next.js default).
- The duplicate copy of `cv.pdf` under `src/assets/docs/`.
