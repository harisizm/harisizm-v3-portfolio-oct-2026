# harisizm.com — Portfolio V3

Third pass at the portfolio for **Hafiz Muhammad Haris** (`harisizm`), a full-stack
engineer in Lahore. Ships to [harisizm.com](https://harisizm.com).

This one is a design-and-experience project before it is a code project. Every
project on the site is a full case study with its own journey — problem, approach,
what was rejected, outcome — rather than a card with three bullets.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript, `strict` |
| Styling | Tailwind CSS v4 via PostCSS, with CSS custom-property tokens |
| Display face | Departure Mono (SIL OFL) — self-hosted, 17 KB |
| Body face | Inter via `next/font/google` |
| Motion | IntersectionObserver + CSS. No animation library unless one earns its place |

```bash
npm run dev        # http://localhost:3000
npm run build
npm run typecheck  # tsc --noEmit
npm run lint
```

---

## Where things are

```
design.md                  THE SPEC. Tokens, grid, type scale, components,
                           page architecture, the case-study template.
                           Read it before writing any UI.
lessons.md                 Decisions made (D-nnn) and dead ends hit (T-nnn).
                           Read before proposing anything clever.
CLAUDE.md                  Working rules for this repo.

src/
├── app/                   App Router pages + globals.css (all tokens)
├── components/ui/         Design-system primitives
├── data/                  Typed content layer — projects, experience, skills
├── hooks/                 useReveal, useScrollSpy, useReducedMotion
└── lib/site.ts            Single source of truth for identity + contact

public/
├── cursor/                Three 32×32 pixel-art cursors (CSS-driven, no JS)
├── fonts/                 Departure Mono + its licence
└── docs/                  CV

context/
├── reference-nvrmnd.md    UI/UX teardown of the design reference
├── portfolio-principles.md  What makes a portfolio convert
├── v2-post-mortem.md      10 structural problems in V2 — the do-not-repeat list
└── repo-context.md        V2's stack and architecture, for reference

reference/nvrmnd/          41 WebP screenshots of the design reference + an index
assets/                    Source media. Derive optimised copies; never
                           overwrite in place.
```

---

## The rules that matter

These exist because V2 got each one wrong. Full detail in `lessons.md`.

1. **Every interactive element resolves to a real destination.** V2's "Hire me"
   button had no `onClick` and no `href` at all. Where there is no destination —
   a project with no deployment — the control does not render. That is why
   `Project.live` is `string | null`.
2. **No root font-size hack.** V2 set `html { font-size: 77% }` and silently broke
   every `rem` on the site.
3. **Content lives in the typed data layer**, never inside components.
4. **`prefers-reduced-motion` is honoured by every animation**, from the first one.
   Reveal animations resolve to their final state with JS disabled.
5. **The contact path works without hover and without JavaScript.**
6. **Page weight under 1 MB.** V2 shipped ~8 MB of PNGs.
7. **Nothing invented.** No fabricated testimonials, no placeholder metrics
   presented as real.

---

## Design reference

The visual system is modelled closely on [nvrmndstudio.com](https://www.nvrmndstudio.com),
a deliberate and recorded decision (`lessons.md` D-002). `context/reference-nvrmnd.md`
documents what was measured and why, including the defects that were **not** carried
over — notably its complete absence of reduced-motion support and its mobile
scroll-spy regression.

Both of that site's typefaces are commercially licensed and are **not** reused here;
Departure Mono and Inter stand in for them (`lessons.md` D-005).

`reference/nvrmnd/` is an archive. Read it; never import from it, never ship it.
