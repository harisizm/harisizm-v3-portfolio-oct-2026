# V2 source — archive only

Copied verbatim from the Portfolio V2 repo on 2026-10-27. Kept so V3 can look
back at how something was done. **This code does not build as-is.**

## Why it will not compile

- **Icon imports are unresolved.** Every section imports SVGs as React
  components (`import StarIcon from '@/assets/icons/star.svg'`). Those SVGs were
  deliberately not carried over, and the `@svgr/webpack` config that made such
  imports work lives in V2's `next.config.mjs`, which was also left behind. The
  pattern is documented in `../../context/repo-context.md`.
- **Image imports are unresolved.** Paths are `@/assets/images/...` and
  `@/assets/project images/...`; the files now live under `../../assets/`.
- **The `@/` alias is gone** with `tsconfig.json`.
- **Tailwind classes have no config behind them.** These components assume V2's
  three-breakpoint config, its custom keyframes (`move-left`, `move-right`,
  `ping-large`, `spin-slow`), its `--font-sans` / `--font-serif` variables, the
  `.nav-item` and `.hero-ring` base classes, and — critically — the
  `html { font-size: 77% }` rule that scaled every rem. Nothing here will size
  correctly outside that environment. See `v2-post-mortem.md` §1.

## What is worth a look

| File | Why |
|---|---|
| `components/HeroOrbit.tsx` | The orbit + counter-spin animation. The one piece of V2's decoration that was genuinely well made (49 lines). |
| `components/ToolboxItems.tsx` | The infinite marquee pattern — duplicate the list, translate -50%, loop. |
| `components/TechIcon.tsx` | The devicon CDN slug convention. |
| `components/smoothScroll.ts` | Custom easing for scroll-to-section. |
| `components/Card.tsx` | How the grain texture was applied to every card (17 lines). |
| `sections/Hero.tsx` | **As a cautionary example.** 529 lines. The hover-positioned CV preview starts around the `handleCVEnter` logic — ~40 lines of manual `getBoundingClientRect` placement maths that a popover primitive replaces. |

## What to ignore

`sections/Contact.tsx` and the social-fan-out block inside `sections/Hero.tsx`
are the same feature written twice, and the "Hire me" button in `Contact.tsx`
has no click handler at all. `sections/Projects.tsx` redefines `TechIcon`
locally, duplicating `components/TechIcon.tsx`.

`_page.tsx` is V2's `src/app/page.tsx`, renamed so it is not mistaken for a
route.
