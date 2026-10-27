# V3 Design Spec

The authoritative design document for **harisizm.com**. Every build decision
follows this file. If something here turns out to be wrong, change it here first,
then change the code — and record why in [`lessons.md`](lessons.md).

Measured from the reference site on 2026-10-27. Numbers in this file are observed
values, not estimates. See [`context/reference-nvrmnd.md`](context/reference-nvrmnd.md)
for the full teardown and [`reference/nvrmnd/`](reference/nvrmnd/) for screenshots.

---

## 0. The four decisions this spec is built on

| Decision | Choice | Consequence |
|---|---|---|
| Audience | **Freelance clients first** | Hero sells an outcome, not a job title. Case studies argue value. Contact asks budget + timeline. |
| Visual direction | **Near-replica of the reference aesthetic** | Same canvas, same two accents, same pixel/neutral type pairing, same interaction grammar. |
| Name | **"Haris" in prose, `harisizm` as the wordmark** | Legal name appears only on the CV and in the footer. |
| Case study depth | **All projects get the full treatment** | The template must scale — new work is coming and is stronger than the V2 six. |

---

## 1. Licensing — resolve before the first line of CSS

Near-replica means matching the reference's two typefaces. **Neither is free for
this use.** This is a blocker, not a footnote: harisizm.com sells freelance
services, which is commercial use.

### Off-Bit (the pixel display face)

The reference serves a family literally named `Offbittrial` — a trial cut — in
production. Off-Bit is a commercial release from Power Type Foundry: free for
personal use only, licensed for commercial use from roughly $70–90 for the six-style
family.

**Pick one before building:**

- **Buy Off-Bit.** Exact parity with the reference. Verify the web-font tier covers
  the pageview volume you expect.
- **Use Departure Mono** (free, open licence). Closest free match in spirit — pixel
  grid, technical register, excellent at small sizes for labels and numbers.
- **Use Pixelify Sans, Silkscreen or Jersey 10** (all Google Fonts, SIL OFL). Safe
  and free, but each sits further from the reference's proportions.

Confirm the licence terms on the foundry's own page before shipping, whichever you pick.

### SF Pro Display (the body face)

Apple licenses SF Pro for designing interfaces **on Apple platforms**. Serving it
as a web font on a commercial site is outside that licence. The reference does it
anyway; we will not.

**Use Inter instead** (SIL OFL, free). It is the standard open substitute for SF Pro
— near-identical proportions, same neutral-grotesque register, and a genuine variable
font so the 300/400/500/600 weights this spec calls for cost one file. `Geist` is an
equally safe alternative.

> **Until the display face is chosen, build with Departure Mono + Inter.** Swapping
> the display face later is a one-line token change if every rule references
> `--font-display` rather than a family name.

---

## 2. Tokens

Declared once, as CSS custom properties on `:root`. Nothing hardcodes a hex value.

```css
:root {
  /* Surface */
  --canvas:      #D9D9D9;  /* page background — warm grey, never white */
  --ink:         #222222;  /* body text, dark panels */
  --white:       #FFFFFF;
  --surface-alt: #F4F4F4;  /* rare — lifted cards on canvas */

  /* Accent — exactly two. No third accent, no gradients. */
  --accent:      #033FED;  /* electric blue: links, chips, primary CTA, active state */
  --accent-2:    #BEFD66;  /* acid lime: logo chip, menu detail, status dot, markers */

  /* Support */
  --dim:         #8C8C8C;  /* secondary text, inactive nav */
  --mid-grey:    #727272;
  --border:      #BBBDC1;
  --grid-line:   #2467EC;  /* the dotted column rules — a lighter blue than --accent */

  /* Type */
  --font-display: "Departure Mono", ui-monospace, monospace; /* or Off-Bit, once licensed */
  --font-body:    "Inter", system-ui, sans-serif;
}
```

**The two-accent rule is the whole discipline.** The reference looks expensive
because it never reaches for a third colour. Blue carries every interactive
affordance; lime is reserved for identity and state. A new colour is a design
change, not an implementation detail — it goes through `lessons.md`.

### Dark mode

The reference has none, and the warm-grey canvas is the identity. **Ship light
only for v1.** If dark mode is added later it is a second designed surface, not an
inverted filter.

---

## 3. Grid

Measured at 1440px:

```css
.grid-overlay {
  position: absolute; inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-inline: 16px;
  pointer-events: none;
}
.grid-overlay > span { border-left: 1px dotted var(--grid-line); }
.grid-overlay > span:last-child { border-right: 1px dotted var(--grid-line); }
```

- 16px outer gutter, 1408px content width at 1440px viewport
- 4 equal columns (352px each at 1440px)
- Dotted 1px rules on every column boundary — **5 visible lines**, including both edges
- The overlay is decorative: `pointer-events: none` and `aria-hidden="true"`

The rules are a visible motif, not a dev tool. They stay in production. They are
what makes the generous whitespace read as deliberate rather than empty.

**Breakpoints:** 4 columns ≥1024px, 2 columns 640–1023px, 1 column <640px. The
rules reduce with the columns. Define `xl` and `2xl` — V2's omission of them is
listed in the post-mortem.

---

## 4. Typography

Two families, strictly divided by job.

**`--font-display` (pixel)** — labels, nav, numbers, step names, the wordmark, chips.
Always uppercase, always letter-spaced. Never body copy; it is unreadable in paragraphs.

**`--font-body` (Inter)** — every sentence a human reads.

### Scale (measured)

| Role | Size | Weight | Line-height | Tracking | Family |
|---|---|---|---|---|---|
| Hero display | 120px | 600 **and** 300 | 0.9 | normal | body |
| Menu nav item | 96px | 700 | 1.0 | normal | display |
| Big statement | 51px | 400 | 1.15 | −1.5px | body |
| Section heading | 48px | 500 | 1.1 | −1px | body |
| Step name | 48px | 700 | 1.1 | +1px | display |
| Project title | 40px | 500 | 1.1 | normal | body |
| Wordmark | 24px | 700 | 1.0 | +0.6px | display |
| Lead paragraph | 20px | 300 | 1.4 | −0.1px | body |
| Body | 18px | 400 | 1.5 | normal | body |
| Number (`Ø1`) | 18px | 700 | 1.1 | normal | display |
| Label / chip | 13px | 400 | 1.2 | +0.2px | display |

**The hero's signature move:** one sentence, two weights. The first clause in 600,
the resolving clause in 300, both at 120px. It creates hierarchy inside a single
headline without changing size or colour. Reuse it; do not overuse it.

**Root font-size stays at browser default.** No `html { font-size: X% }` — that hack
broke every rem in V2 and is the first item in the post-mortem. If the scale feels
large, change the scale here.

### Numerals

Use the display face's slashed zero for all sequence numbers: `Ø1 Ø2 Ø3`. It is a
small detail that does a lot of the technical-register work.

---

## 5. Cursor

Three 32×32 pixel-art SVGs, swapped by plain CSS. **No JavaScript follower element** —
the reference does this entirely in CSS, which is why it never lags behind the pointer.

```css
body { cursor: url("/cursor/default.svg") 2 0, auto; }
body :is(p,h1,h2,h3,h4,h5,h6,input[type=text],input[type=email],textarea) {
  cursor: url("/cursor/text.svg") 9 19, text;
}
body :is(a,a *,button,button *,input[type=submit],[role=button]) {
  cursor: url("/cursor/pointer.svg") 12 0, pointer;
}
```

Hotspots matter: `2 0` for the arrow tip, `9 19` for the I-beam centre, `12 0` for
the pointing finger's fingertip. Get these wrong and clicks feel misaligned.

Draw original cursors on a 32×32 pixel grid in the same lo-fi register — a stepped
arrow, a bracketed I-beam, a pointing hand. Always supply the native keyword
fallback (`auto` / `text` / `pointer`) so the site stays usable if the SVG 404s.

**Touch devices:** ship the custom cursor behind `@media (hover: hover) and (pointer: fine)`.

---

## 6. Motion

The reference runs GSAP + ScrollTrigger + SplitText + Flip. CSS transitions are
almost absent — only `opacity 0.3s ease`. That split is correct: CSS for state,
JS for choreography.

| Job | Tool |
|---|---|
| Hover/focus state changes | CSS `transition: opacity .3s ease` |
| Scroll-triggered reveals | ScrollTrigger (or IntersectionObserver) |
| Headline character reveals | SplitText (or a hand-rolled span splitter) |
| Moving the hover reticle between nav items | Flip (or FLIP via `getBoundingClientRect`) |

**You do not need GSAP to ship v1.** IntersectionObserver plus CSS transforms covers
reveals and the reticle. Add GSAP only when a specific effect demands it, and say
which effect in `lessons.md`. Do not add a dependency without a reason worth stating.

### Reduced motion — non-negotiable

The reference has **zero** `prefers-reduced-motion` rules. This is a defect we do not
inherit; the project rules require honouring it from the start.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

And gate JS choreography at the source, so reveals resolve to their final state
instead of never firing:

```js
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) { el.classList.add('is-revealed'); } else { /* animate */ }
```

Every element that animates in must be **visible and readable in its final state
with JS disabled.** Reveal by animating from `opacity: 1`, or add the hidden class
via JS on load — never ship content that is invisible until a script runs.

---

## 7. Components

### 7.1 Section label chip
Small uppercase display-face text, white on `--accent`, tight padding, square corners.
Sits above every section heading. `[ bracketed ]` variant for page-level labels
(`[ WORK ]`, `[ CONTACT ]`) rendered in blue on canvas.

### 7.2 Split CTA
The primary action is **two adjacent controls**: a filled blue button with the label,
and a separate square outlined button containing `↗`.

Both must be inside one `<a>` or point at the same destination — two controls, one
action. **This is where V2 failed hardest:** the "Hire me" button had no handler at
all. Every CTA on V3 resolves to a real `href`.

### 7.3 Rule-to-link
A section heading on the left, a 1px rule spanning the empty middle, and a
`LABEL ↗` link flush right. Used for "MORE ABOUT US", service rows, any
heading-plus-action line. Cheap to build, does a lot of structural work.

### 7.4 Form field
The label is a blue chip **overlapping the top border of the input**, not sitting
above it. Input has a 1px blue border and a transparent fill.

Accessibility: the chip is a real `<label for>`, never a placeholder. Placeholders
carry example text only, and that text should have personality.

### 7.5 Dark panel
`--ink` background, white text, `↗` in the top-right corner, label bottom-left.
Used for `[ VIEW ALL PROJECTS ]` and the persistent "Want to discuss a project?" card.
The escalating trio — grey panel, then dark panel, then blue panel — is the
reference's strongest hierarchy device. Reuse it for any three-step sequence.

### 7.6 Status pill
A small `--accent-2` square followed by uppercase display-face text in blue:
`▪ AVAILABLE FOR WORK — [MONTH]`.

**Make it one data flag**, not baked into markup. V2 hardcoded "Available for new
projects" into an SVG `textPath` with no way to turn it off. If the flag is false,
the pill does not render.

### 7.7 Hero bottom rail
Anchored to the **bottom of the hero section**, not to the viewport: socials left,
`↓ SCROLL DOWN` centre, email right. It scrolls away with the hero.

> Corrected 2026-10-27. This originally read "fixed to the viewport bottom", which
> was a misreading of the reference — compare `reference/nvrmnd/home-0.webp` (rail
> at the bottom) with `home-850.webp` (same rail at the top of frame, i.e. it
> scrolled). A viewport-fixed rail covers whatever sits at the bottom of the screen
> at *every* scroll position; it overlapped the hero CTA on first render.

The email is a real `mailto:` — the contact path must work without hover and
without JS. The scroll cue takes the next section's id so it is a real link;
with no id it renders as plain text rather than a dead control.

---

## 8. The menu

Full-viewport overlay in `--accent`. The grid rules stay visible through it.

- Nav items in the display face at 96px, stacked, right-aligned to a column edge
- Each numbered `Ø1`–`Ø4` in lime, set small and raised to the right
- **Current page:** white, opacity 1
- **Inactive:** opacity 0.5
- **Hovered:** opacity 0.75, and a set of lime **crop-mark brackets** animates to
  frame the item — four corner marks, like a viewfinder reticle
- Right column: socials with icons, email in `[ brackets ]`, newsletter form
- The trigger toggles `+ MENU` → `✕ MENU` and flips to lime

The reticle is one element that moves between items (FLIP), not four elements that
fade. That continuity is the entire effect.

**Requirements the reference misses:** trap focus inside the open overlay, close on
`Escape`, return focus to the trigger on close, and set `aria-expanded` on it. Lock
body scroll while open.

---

## 9. Page architecture

```
/                 Home
/work             Project index
/work/[slug]      Full case study  ← the centre of the site
/about            Story, skills, experience, education
/contact          Forked enquiry
```

### 9.1 Home

Ordered so the strongest evidence comes first — V2's biggest structural error was
burying shipped work under a degree that finishes in 2027.

1. **Hero** — two-weight 120px headline, support paragraph right, split CTA, bottom rail
2. **Positioning** — one large statement paragraph, then a rule-to-link to About
3. **Selected work** — 3 projects, each: label chip, title, description, thumbnail row
   on the left; large art-directed image on the right. Ends in a dark
   `[ VIEW ALL PROJECTS ]` panel
4. **Process** — three numbered steps, display-face names, line-art diagram each
5. **Capability** — the grouped stack from `context/skills.md`, not a flat marquee
6. **Proof** — usage numbers and any real feedback
7. **Contact** — the fork, previewed
8. **Footer** — giant `harisizm` wordmark in the display face, quick links, email in brackets

### 9.2 Case study — the template

This is the thing the whole site exists to deliver. Two columns.

**Sticky left rail** (persists the entire scroll):
- `‹ BACK`
- Project title, large
- One-line description
- `🌐 VIEW LIVE` — **omit entirely when there is no deployment.** V2 rendered a
  "Live Demo" button pointing at `#` for Grocery POS, which scrolled to the top
- Pinned to the bottom: scroll-spy section nav, active item dark with a `▪` marker,
  inactive in `--dim`

**Scrolling right column:**

| Section | Content |
|---|---|
| Hero image | Art-directed, full-bleed |
| **Overview** | The situation as narrative. Big statement paragraph, then a smaller **right-aligned** continuation. That asymmetry is the signature rhythm — big left block, small right block |
| **The Challenge** | Prose intro, then `Core Problems:` as a tight list, then the breaking point in one line |
| **The Approach** | Numbered sub-headings (`1.`, `2.`, `3.`) — what you considered, what you chose, **why you rejected the alternative** |
| **The Outcome** | Honest results. Metrics where they exist, qualitative where they do not |
| **Evidence** | See below |
| **Next Up** | `‹ BACK` left, `[ VIEW NEXT ]` right, next project title + its hero image, plus the dark contact card |

Between text sections, drop **craft-evidence boards** — the reference shows a colour
palette board with hex codes and a type specimen sheet. The engineering equivalents,
all of which this work already has:

- The EER diagram for Grocery POS (named explicitly in the CV)
- An architecture or data-flow diagram
- The `<2s` local PDF parse, shown as a measurement rather than a claim
- Before/after of a real interface
- Role-based access matrices, API shapes, state machines

Use the `/diagram` skill to produce these as SVG — see [`.claude/skills.md`](.claude/skills.md).

> **The adaptation that matters.** The reference leans on **Client Notes** — a real
> testimonial — to close every case study. These projects are self-initiated and have
> none. Do not fake one and do not leave the slot empty. Replace it with **Evidence**:
> usage numbers (100+ students on TransGPA, 60+ on Timetable Generator), unsolicited
> user feedback if any exists, or a screenshot of the thing genuinely in use. When a
> real client testimonial does arrive, it drops into the same slot.

**Three exits, always.** Back to index, next project, or contact. A case study never
dead-ends.

**Mobile:** the sticky rail collapses to a static header — back, title, tag chips,
description, view-live. The reference drops the scroll-spy nav entirely here;
**we replace it with a thin sticky progress indicator** so long case studies stay
navigable on a phone.

### 9.3 Contact — the fork

Audience is clients-first, but recruiters will arrive too. Route by intent, the way
the reference splits "ready to start" from "still exploring":

- **Option 01 — Start a project.** Qualifying form, grouped `01 | 02 | 03`: project
  type, goal, budget, timeline, then business, then name and email.
- **Option 02 — Hiring / something else.** CV download, LinkedIn, GitHub, email.
- **Always visible:** a plain `mailto:` fallback. No hover, no JS, no form required.

The success state names a real response window and mentions the spam folder.

---

## 10. Content rules

- **Lead with identity, not job title.** See
  [`context/portfolio-principles.md`](context/portfolio-principles.md) — a hero that
  opens "Full-stack developer" is indistinguishable from every other application.
- **Narrate the work; never just link to it.** The live link belongs *inside* the
  case study as proof. The case study is the argument.
- Every claim with a number keeps its number.
- Fix the copy defects catalogued in `context/copy-deck.md` deliberately, not by
  accident — notably "ensure" → "ensuring" and the shouting "FOR UOL SE Department".
- **Content lives in a typed data layer**, never in JSX. V2's object literals inside
  500-line components is post-mortem item 7.

```ts
// src/data/projects.ts
export interface Project {
  slug: string;
  title: string;
  tagline: string;
  date: string;            // ISO, for sorting
  dateLabel: string;
  durationLabel?: string;
  tags: string[];          // "Full-stack", "Data", "UX/UI"
  stack: string[];
  live: string | null;     // null ⇒ the View Live control does not render
  repo: string | null;
  cover: ImageRef;
  caseStudy: {
    overview:  { lead: string; aside: string };
    challenge: { intro: string; problems: string[]; breakingPoint: string };
    approach:  { intro: string; steps: { title: string; body: string }[] };
    outcome:   { headline: string; body: string; metrics?: Metric[] };
    evidence:  Testimonial | UsageEvidence;
    boards:    Board[];    // the craft-evidence artefacts
  };
}
```

Sort by `date` descending. V2 displayed Jan 2026 → Aug 2025 → Dec 2025 → Dec 2025 →
May 2025 → Apr 2025 — neither chronological nor ranked.

---

## 11. Accessibility

Every one of these is a V2 defect being closed, an observed reference gap, or both.

- `prefers-reduced-motion` honoured by every animation (§6)
- `aria-hidden="true"` on the grid overlay and all decorative imagery
- `aria-label` on every icon-only control — never a hover tooltip as the only label
- Nav is real `<a href>` with real anchors; no `preventDefault` + manual scroll
- Menu overlay: focus trap, `Escape` to close, focus restored, `aria-expanded`
- Visible focus rings everywhere. The custom cursor does not substitute for focus state
- Contrast: `--dim` (#8C8C8C) on `--canvas` (#D9D9D9) is **~2.2:1 and fails WCAG AA**.
  The reference uses it for inactive nav and secondary text anyway. Use `--mid-grey`
  (#727272, ~4.6:1) for any text that must be read; reserve `--dim` for genuinely
  decorative state
- Touch targets ≥44×44px
- Alt text describes content; decorative images get `alt=""`

---

## 12. Performance budget

- **Page weight under 1 MB.** V2 shipped ~8 MB of PNGs
- All imagery **AVIF with WebP fallback** — the reference serves AVIF, correctly
- Real `srcset`/`sizes` on every content image (the reference omits these — a gap)
- `loading="lazy"` below the fold, `eager` + `fetchpriority="high"` on the hero only
- One decode per image. V2 rendered every project screenshot twice — once blurred as
  a background wash, once sharp
- Never set `unoptimized`
- Grain/noise via CSS or inline SVG, never a 176 KB JPEG on every card
- Self-host fonts; subset them; `font-display: swap`
- Vendor the 18 tech icons locally as SVG. V2 fetched them from jsDelivr at runtime

**Before launch:** re-export `zayr.png` (1.3 MB), `zayrah.png` (1.3 MB) and
`Khilariverse.png` (936 KB), and rename the files with spaces to kebab-case.
Derive optimised copies alongside the originals — never overwrite `assets/` in place.

---

## 13. Open items

Tracked here until resolved, then moved to `lessons.md`.

- [ ] **Display face licensed** — buy Off-Bit or commit to Departure Mono (§1)
- [ ] **Hero line written** — identity, not job title
- [ ] **Framework chosen** — Next.js is the reasonable default given the stack and
      the static-with-routes shape, but nothing here depends on it
- [ ] **Non-technical roles** — the CV already drops the SBI email-marketing role and
      promotes TransGPA + Timetable Generator into `EXPERIENCE`. The site should
      almost certainly do the same
- [ ] **Phone number** — the CV carries `+92 300 9495926`; V2 never published it.
      Clients-first is an argument for publishing it; decide deliberately
- [ ] **CGPA 2.92** — on the CV, never on V2. Recommend leaving it off the site
- [ ] **Portfolio URL conflict** — the CV points at `harisifti.vercel.app`,
      `context/profile.md` at `haris-portfolio-v2.vercel.app`. Both become
      `harisizm.com`; re-export the CV
- [ ] **Verify every live URL still resolves** before launch. Streamlit apps sleep;
      a dead link is worse than no link
