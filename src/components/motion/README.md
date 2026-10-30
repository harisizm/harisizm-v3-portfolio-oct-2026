# Motion primitives

The motion layer for the site (lessons.md D-017). Everything here is a client
component built on `motion/react`, and everything here obeys three rules:

1. **Readable with JS off.** The server renders the final state, or a hidden
   state that `MotionBoot` undoes when no script runs. Nothing a visitor needs
   depends on an animation having played.
2. **Reduced motion means the final state, now.** Under
   `prefers-reduced-motion: reduce` every primitive renders its resting state
   immediately, and continuous effects (`Marquee`, `Magnetic`,
   `Parallax`, the cover morph) do not run at all. Not slower. Off.
3. **Pointer effects need a pointer.** `Press`'s hover lift and `Magnetic`
   are gated on `(hover: hover) and (pointer: fine)`.

Import from `@/components/motion`. Do not import `motion/react` directly in
page components; if a primitive is missing, add it here so the rules above
apply to it.

## Tokens

```ts
import { EASE, DURATION, STAGGER, houseTransition } from "@/components/motion";

EASE          // [0.2, 0.8, 0.2, 1]   one curve for everything
DURATION.fast // 0.3s  exits, state changes
DURATION.base // 0.6s  reveals
DURATION.slow // 0.9s  the signature moves (count-ups, the cover morph)
STAGGER       // 0.06s between staggered siblings
houseTransition(duration = DURATION.base, delay = 0) // { duration, delay, ease: EASE }
```

## How "hidden on the server" stays safe

`MotionBoot` (first child of `<body>` in `app/layout.tsx`) is an inline script
and one hoisted CSS rule:

- The script stamps `data-js` on `<html>` before the body is parsed, unless
  the visitor prefers reduced motion. It withdraws the stamp after four
  seconds if `MotionProvider` has not set `data-hydrated` (bundle failed).
- The rule `html:not([data-js]) [data-enter] { opacity:1; transform:none;
  clip-path:none; visibility:visible }` (all `!important`) forces every element
  carrying `data-enter` to its final state whenever the stamp is absent.

So a primitive that server-renders a hidden state must put `data-enter=""` on
the element that carries the hidden inline style. `Reveal`, `Stagger`'s
children, `SplitLines` and `CountUp` already do. If you write a new one, do
the same.

Reduced motion is read with `useReducedMotion` from `@/hooks`, not motion's
own hook: ours returns `false` on the server and during hydration, so server
and client markup agree and the client corrects itself one render later.
Motion's returns `null` on the server and the real value on the client's first
render, which would mismatch. `MotionConfig reducedMotion="user"` in
`MotionProvider` is the second net underneath.

## Setup (already done in `app/layout.tsx`)

```tsx
<html suppressHydrationWarning>        {/* MotionBoot stamps data-js early */}
  <body>
    <MotionBoot />
    <MotionProvider>                   {/* MotionConfig + cover-morph state */}
      <Header />
      <div className="relative">
        <RouteGridOverlay />
        <PageTransition>{children}</PageTransition>
      </div>
      <Footer />
    </MotionProvider>
  </body>
</html>
```

## Primitives

### `Reveal`

Fade and rise into place, once, when 20% of the block is in view.

| Prop | Default | Notes |
|---|---|---|
| `children` | | |
| `className` | `""` | |
| `as` | `"div"` | `"div" \| "section" \| "article" \| "li" \| "span"` |
| `delay` | `0` | seconds, added to any stagger it sits in |
| `amount` | `0.2` | fraction in view before it fires |
| `y` | `16` | px of rise; `0` for a plain fade (full-bleed images) |
| `duration` | `DURATION.base` | |
| `threshold` | | deprecated alias of `amount`, kept for the home sections |

`@/components/home/Reveal` re-exports this, so existing imports keep working.

### `Stagger`

Spreads the start times of the `Reveal`s directly inside it. Children keep
their own `y`, `duration` and `delay`; only the start is staggered. Other
markup can sit between them; only `Reveal` (or a `motion.*` with `variants`)
takes part.

| Prop | Default |
|---|---|
| `children`, `className`, `as` | as `Reveal` |
| `stagger` | `STAGGER` |
| `delay` | `0` |
| `amount` | `0.2` |

```tsx
<Stagger className="grid lg:grid-cols-3">
  {steps.map((s) => <Reveal key={s.id} as="li">...</Reveal>)}
</Stagger>
```

### `SplitLines`

A headline whose lines rise one after another from behind a clip. Takes a
plain string. The server renders the words inline (fully readable); the client
measures where they wrap and re-renders one block per line. Re-measures on
resize and when fonts land.

| Prop | Default | Notes |
|---|---|---|
| `children` | | `string` only |
| `as` | `"span"` | `"h1" \| "h2" \| "h3" \| "p" \| "span" \| "div"` |
| `className` | `""` | applied with `relative block` |
| `delay` | `0` | |
| `stagger` | `STAGGER` | |
| `duration` | `DURATION.base` | |
| `amount` | `0.2` | |

Mixed weights in one headline (the hero's three lines) are three instances
with increasing `delay`. `text-indent` applies to the first line only.
Padding belongs on a parent, not on the element.

```tsx
<h1 className="...">
  <SplitLines className="font-semibold">Eight hours</SplitLines>
  <SplitLines className="font-semibold" delay={STAGGER}>of work, done in</SplitLines>
  <SplitLines className="font-light" delay={STAGGER * 2}>ten minutes.</SplitLines>
</h1>
```

### `Press`

Press feedback for a button or link. Wrap the control; the control is
untouched and keeps its own href, focus ring and markup.

| Prop | Default | Notes |
|---|---|---|
| `className` | `"inline-block"` | pass `"block"` to fill a grid cell |
| `scale` | `0.97` | on tap, all pointers |
| `lift` | `2` | px of hover lift, fine pointer only |

### `Magnetic`

The element leans up to `strength` px toward the pointer and springs back.
Fine pointer only, off under reduced motion.

| Prop | Default |
|---|---|
| `className` | `"inline-block"` |
| `strength` | `8` |

### `CountUp`

Counts the leading integer of a stat from zero when it scrolls into view;
prefix and suffix stay literal. `~2,000`, `95%+`, `24h+` and `8h → ~10 min`
all read correctly (the last counts only the `8`). A value with no digits is
rendered as is. Width is reserved from the final figure so nothing shuffles.

| Prop | Default |
|---|---|
| `value` | required, the final string |
| `className` | `""` |
| `duration` | `DURATION.slow` |
| `amount` | `0.6` |

### `Marquee`

A continuous horizontal strip, pausing on hover. Renders the content twice
(the repeat is `aria-hidden`) and wraps seamlessly. Reduced motion: one static
copy.

| Prop | Default | Notes |
|---|---|---|
| `className` | `""` | the strip; `overflow-hidden` is applied |
| `speed` | `60` | px per second |
| `gap` | `48` | px between items and before the repeat |
| `pauseOnHover` | `true` | |

### `Parallax`

Scroll-linked drift for an image inside a positioned, fixed-ratio frame. Fills
the frame, hides overflow, and drifts the child between `-amount` and
`+amount` of its height as the frame crosses the viewport. The transform is
applied only after the first scroll measurement, so the server output and the
first client frame match.

| Prop | Default | Notes |
|---|---|---|
| `amount` | `6` | percent travel each way |
| `overscan` | `amount` | percent the layer extends past the frame at each end. Use `0` for `object-contain` images, which must not be scaled past the frame |

Covers use `amount={COVER_DRIFT}` (3) and `overscan={0}` (see below).

### `MorphCover`

One end of the cover morph. Usually you do not use it directly: `ProjectCover`
takes a `morph` prop and the home card wraps its own frame. See below.

| Prop | Default | Notes |
|---|---|---|
| `slug` | required | pairs the two ends |
| `departTo` | `[]` | pathnames whose links lift this cover off the page |
| `className`, `style`, `children` | | |

## The cover frame (owner rule, 2026-10-28)

Every cover sits in one frame, exported from `@/components/work/ProjectCover`:

```ts
COVER_FRAME = "relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface-alt"
COVER_DRIFT = 3
```

The image is `next/image` with `fill` + `sizes` and **`object-contain`**;
covers are never cropped. The letterbox is the window. This applies to the
Selected Work card, the work index row, the case-study hero, Next Up and the
morph clone. The 56px thumbnail in the card's meta row is an icon and keeps
`object-cover`.

## Page transitions

`PageTransition` wraps the route children in `app/layout.tsx` (no
`template.tsx`). `AnimatePresence mode="wait"` keyed on `usePathname()`:
exit 0.3s (opacity to 0, y to -12), then the new page mounts and enters over
0.5s (opacity from 0, y from 16). The first load does not animate; the server
HTML is painted as-is.

**How exit works in the App Router.** The old page is kept rendering its old
route by `FrozenRouter`, which pins `LayoutRouterContext` (imported from
`next/dist/shared/lib/app-router-context.shared-runtime`) to its last value
the moment the copy stops being present. While present the live context is
passed through, so `router.refresh()` and search-param changes still reach the
page. Verified against Next 16.4.3's `layout-router.js`: `OuterLayoutRouter`
reads the segment tree from that context, so pinning it is sufficient.

Under reduced motion both halves run at zero duration (the route still
swaps instantly through the same tree, so nothing remounts differently).

## The cover morph

Clicking a Selected Work card or a work index row lifts the cover off the
page and flies it into the case-study hero while the page fades; either `BACK`
link on a case study flies the hero back down into its index row.

**Implementation: an overlay clone, not a shared `layoutId`.** `layoutId`
needs both elements mounted together inside a stable document. With
`mode="wait"` they never are, and even with `popLayout` Next scrolls to the
top between the two measurements, which corrupts the shared-layout snapshot.
So `CoverMorphProvider` (inside `MotionProvider`):

1. Listens for clicks (capture phase) on same-origin links outside `<header>`,
   with no modifier keys. If a registered `MorphCover` lists the link's
   pathname in `departTo` and is on screen, it records the cover's box and the
   `<img>`'s `currentSrc`, and marks that slug `pending`.
2. Both `MorphCover`s for that slug set `visibility: hidden` (React-managed, so
   the router's back/forward cache can restore them). A fixed clone in the
   `COVER_FRAME` ground, border and `object-contain` sits exactly over the
   source. `PageTransition` drops its vertical travel so the destination can be
   measured cleanly.
3. When the destination `MorphCover` mounts it reports its box; the clone
   flies there over `DURATION.base`, waits for the real image to be loaded,
   then unmounts in the same commit that un-hides the destination.
4. If the destination is more than a quarter-viewport off screen (an index row
   far down the list) the clone fades in place instead. If nothing lands
   within 2.5s, or the route goes somewhere unexpected, the clone is dropped.

Limits, stated plainly:

- Browser back/forward does not morph (there is no click to capture); the page
  fades only.
- Menu links never morph, by design.
- Next Up's cover is not a morph end (NextUp.tsx was outside this task's
  files); it gets parallax only. Pass `morph={{ slug, departTo: [href] }}` to
  its `ProjectCover` to add it.
- The home card is a departure point only; a case study's `BACK` goes to
  `/work`, so landing on the home card is not wired (`departTo` on the hero is
  `["/work"]`).

## The menu

`Header` wraps `MenuOverlay` in `AnimatePresence`. The overlay root is a
`motion.div` with `closed`/`open` variants: a `clip-path: inset()` wipe from
the top-right corner (0.5s), nav items rising in 0.06s apart from 0.2s in, the
contact column fading up after the wipe lands. Close runs the children out
first, then wipes the panel back (0.4s). While leaving, the overlay is `inert`
and its focus trap and Escape handler are off. The reticle waits for the
list's `onAnimationComplete("open")` before its first measurement, because a
box measured mid-rise is wrong by the remaining travel. FLIP, Escape, focus
trap, focus return and scroll lock are otherwise unchanged.

## What is not verified in a browser

This foundation was verified by `tsc`, `eslint`, `next build` and reading the
prerendered HTML (hidden states, `data-enter`, the boot script and stylesheet,
frames and `object-contain`, no SSR parallax transform). The following need a
browser to confirm and should be checked on the first dev run:

- that `FrozenRouter` keeps the outgoing page rendering during the exit;
- the morph flight path and landing against the real images;
- `SplitLines` line grouping on the hero at 390px and 1440px;
- the menu's clip-path wipe interpolating (both ends are four percentages);
- `onAnimationComplete("open")` firing on the inherited-variant `motion.ul`
  (the source in `motion-dom` notifies children; confirm the reticle appears).
