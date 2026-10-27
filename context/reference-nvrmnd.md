# Reference Teardown — nvrmndstudio.com

Explored page by page on 2026-10-27 in headless Chromium at 1440×900 and 390×844.
All values here were **measured from the live DOM**, not estimated from screenshots.

This is the primary design reference for V3. Screenshots: [`reference/nvrmnd/`](../reference/nvrmnd/).
The spec derived from it: [`design.md`](../design.md).

> The studio is run by Kanza Fazal. The site exists to convert creative founders into
> booked clients. Stack: Webflow + jQuery + GSAP. Nothing here is imported or reused —
> this is observation, the same way `reference/v2/` is an archive.

---

## 1. Tokens, as declared on `:root`

```css
--off-white: #d9d9d9;          /* page canvas */
--black: #222;                 /* ink + dark panels */
--white: #fff;
--primary-brand-color: #033fed;   /* electric blue */
--secondary-brand-color: #befd66; /* acid lime */
--dim-text: #8c8c8c;
--mid-grey: #727272;
--border: #bbbdc1;
--light-grey: #ddd;
--offbit-1: Offbittrial;       /* display */
--offbit-2: "Offbittrial 101";
--offbit-3: "Offbittrial Dot"; /* dotted variant — footer wordmark */
--primary: "Sf Pro Display";   /* body */
```

Frequency count across all elements: ink 2130, blue 409, white 347, canvas 289,
lime 40. **The lime is used roughly ten times less than the blue.** It is a spice,
not a second brand colour.

`html` font-size is the browser default 16px. No root-size hack.

### Licensing flags

- `Offbittrial` is a **trial cut** of Off-Bit (Power Type Foundry) — free for personal
  use, commercial licence roughly $70–90 for six styles. Running it on a commercial
  site is outside the free tier.
- **SF Pro Display** is licensed by Apple for interface design on Apple platforms.
  Serving it as a web font here is outside that licence.

Both are reproduced knowingly in V3's near-replica direction — see `design.md` §1
for the substitutions.

---

## 2. Grid

```
.bg-grid-lines { position:absolute; display:grid;
                 grid-template-columns: 352px 352px 352px 352px;
                 padding: 0 16px; }
.hero-line-block { border-left: 1px dotted rgb(36,103,236); }
.hero-line-block:last-child { border-right: 1px dotted rgb(36,103,236); }
```

At 1440px: 16px gutter, 1408px content, four 352px columns, column rules at
x = 16, 368, 720, 1072, 1424. Dotted, in a lighter blue (`#2467EC`) than the accent.

The rules are visible in production on every page. They are the reason the site's
enormous whitespace reads as composed rather than unfinished.

---

## 3. Type scale, measured

| Role | px | Weight | LH | Tracking | Family |
|---|---|---|---|---|---|
| Hero display | 120 | 600 **and** 300 | 108px | normal | SF Pro |
| Menu nav item | 96 | 700 | 96px | normal | Offbit |
| Big statement | 51.2 | 400 | 58.9px | −1.5px | SF Pro |
| Section heading | 48 | 500 | 52.8px | −1px | SF Pro |
| Step name (MAP/MAKE/MOVE) | 48 | 700 | 52.8px | +1px | Offbit |
| Project title | 40 | 500 | 44px | normal | SF Pro |
| Wordmark | 24 | 700 | 24px | +0.6px | Offbit |
| Lead paragraph | 20 | 300 | 28px | −0.1px | SF Pro |
| Body | 18 | 400 | — | normal | SF Pro |
| Sequence number | 18 | 700 | 20px | normal | Offbit |
| Label / chip | ~13 | 400 | — | +0.2px | Offbit |

**The hero sets one sentence in two weights at one size** — the opening clause at 600,
the resolving clause at 300, both 120px. Hierarchy without a size or colour change.

---

## 4. Cursor system

Three 32×32 pixel-art SVGs, swapped entirely in CSS. No JS follower element.

| Selector | Asset | Hotspot |
|---|---|---|
| `body.is--cursor` | `32_cursor.svg` — stepped pixel arrow | `2 0` |
| `p, h1…h6, input[type=text], input[type=email], textarea` | `32_cursor-text.svg` — bracketed I-beam | `9 19` |
| `a, button, input[type=submit], [data-submit]` | `32_cursor-select.svg` — pixel pointing hand | `12 0` |

The SVGs are built from stacked `<rect>`s on a pixel grid (the arrow uses 1.68px
steps), which is what gives the deliberately lo-fi edge. Each rule falls back to the
native keyword.

**The cursor motif leaks into content** — a pixel pointing-hand glyph appears inline
beside a paragraph on the home page, and pixel hands appear in the contact page's
video card. The pointer becomes part of the brand vocabulary.

---

## 5. Motion

Loaded: `gsap.min.js`, `ScrollTrigger.min.js`, `SplitText.min.js`, `Flip.min.js`,
plus Webflow IX2 and jQuery 3.5.1.

CSS transitions are almost nonexistent — only `opacity 0.3s ease` (4 elements),
`opacity 0.2s`, `filter 0.2s`. **All choreography is JS.** SplitText drives
character-level headline reveals; Flip is what moves the menu's hover reticle
between items as one continuous element.

### Defect: no reduced-motion support

```
prefers-reduced-motion rules found in all stylesheets: 0
```

Not a single one. V3 does not inherit this.

---

## 6. Page-by-page

### 6.1 Home (10,267px — 11.4 screens)

| # | Section | Notes |
|---|---|---|
| 1 | Hero | Lime logo chip top-left; status pill `▪ SLOTS OPEN - DEC '26` in blue; `+ MENU` blue button. 120px two-weight headline, support paragraph right-aligned to a column. Split CTA: filled blue `LET'S BUILD YOURS` + separate square `↗` button |
| 2 | Bottom rail | Fixed: `INSTAGRAM, LINKEDIN` left · `↓ SCROLL DOWN` centre · email right |
| 3 | About | Blue `ABOUT US` chip, one 51px statement paragraph, rule-to-link `MORE ABOUT US ↗`, then smaller body with an inline pixel-hand glyph |
| 4 | Work ×3 | Left: chip, 40px title, description, thumbnail + name + date row. Right: large art-directed image. Closes with a dark `[ VIEW ALL PROJECTS ]` panel with `↗` top-right |
| 5 | Process | `Ø1 Ø2 Ø3` in grey above blue pixel-face names MAP / MAKE / MOVE, subtitles using a `//` separator, a generative line-art diagram each, centred body text |
| 6 | Services | Numbered rows: `Ø1` + 48px title + long rule + duration with a stopwatch icon. Below: description left, blue comma-separated tag list centre, line-art icon in a rounded square right |
| 7 | Testimonials | Device photo left with a floating `Case Study / [name]` card; quote right; avatar, name, role. Carousel arrows top-right |
| 8 | Lead magnet | Free guide, blue CTA |
| 9 | Newsletter | "THE **404** ARCHIVES" — `404` set in the dotted display face in lime, mid-sentence. Magazine-in-a-polybag mockup on black |
| 10 | Footer | Giant `NVRMND` wordmark in the dotted display face, full width. Quick links as a comma-separated inline list. Email in `[ brackets ]`, blue |

### 6.2 Menu overlay

Click `+ MENU` → full-viewport `#033fed` overlay. Grid rules remain visible through it.

- `HOME / ABOUT / WORK / ARCHIVE` in the pixel face at 96px, right-aligned, numbered
  `Ø1`–`Ø4` in lime
- Current page white at opacity 1; inactive 0.5; hovered 0.75
- **Lime crop-mark brackets frame the hovered item** — four corner marks, a viewfinder
  reticle. Confirmed by hovering WORK: the reticle moved off HOME and framed WORK.
  One element moving, not four fading
- Right column: `SOCIALS` with icons, `E-MAIL` in brackets, newsletter form with the
  lime chip label overlapping the input's top border
- Trigger becomes `✕ MENU` in lime
- `transition: opacity 0.3s ease` on the items

Gaps: body scroll is not locked (`overflow: visible` while open), and there is no
focus trap.

### 6.3 Work index (1,906px)

**Sticky left column** holding `[ WORK ]`, the 48px heading, a description, and a dark
`Want to discuss a project? ↗` card pinned bottom-left — it stays on screen for the
whole scroll while full-bleed project images pass on the right.

Persistent context + scrolling evidence + an always-present CTA. Directly reusable.

Each project image is art-directed to the client's brand: a laptop on concrete steps
for the editorial studio, a university façade for the study-abroad client, a green
velvet sofa for the rebellious copywriter. Not flat mockups — environments.

### 6.4 Case study — `/work/intellete` (8,256px)

The most important page on the site.

**Sticky left rail, full-page:**
- `‹ BACK`
- Project title, large
- One-line description
- `🌐 VIEW LIVE` in blue
- Pinned bottom: scroll-spy nav `Overview / Challenge / Strategy / Outcome / Testimonial`.
  Active item dark with a `▪` marker, inactive `--dim-text`. Verified updating across scroll.
  Markup class `case-study-nav`, `position:absolute` inside a `position:sticky` parent

**Right column, in order:**

1. Full-bleed art-directed hero
2. Meta: tags (`UX/UI`, `web-design`, `Webflow`), description, `Date`, `Duration`, `View live`
3. **Overview** — narrative in second person. Opens by putting the reader inside the
   client's situation, lands the problem, then names the client. A **51px left block**
   followed by a **smaller right-aligned block** — the signature asymmetric rhythm
4. Image evidence — 2-up grid, then full-bleed
5. **The Challenge** — a direct client quote, a parenthetical aside in the studio's own
   voice, then `Core Problems:` as four tight items, then the breaking point
6. **Our Strategy** — three numbered sub-headings, each a named approach plus prose
7. **Craft-evidence boards** — a colour palette board (named swatches, each with
   Hue/Saturation/Brightness/hex) and a type specimen board (family name, style count,
   classification, a large glyph, the full character set)
8. **The Outcome** — `The Results? Chef's Kiss`. Deliberately admits the metrics were
   not the best part
9. **Client Notes** — large display-type quote, small lime `▫` marker, attribution
10. **Next Up** — `‹ BACK` left, `[ VIEW NEXT ]` right, next project title and its hero
    image, plus the dark contact card

**Three exits at the end, never a dead end.**

Layout for sections 5–9: small grey label in a left column, content in a right column
that stops well short of the full width. The empty gutter is load-bearing.

**Known bug on their site:** `No items found.` renders three times in the text —
empty Webflow collection lists between sections.

### 6.5 Case study on mobile (390px)

The sticky rail collapses into a static header: Back, title, **tag chips (mobile-only)**,
description, View Live. Content stacks. No horizontal overflow (`scrollWidth` = 390).
The right-aligned continuation paragraph stays right-aligned — the rhythm survives.

**The scroll-spy nav disappears entirely on mobile.** On a 9-screen page that is a real
loss of orientation. V3 replaces it with a sticky progress indicator.

### 6.6 About

- Blue `OUR APPROACH` chip, centred 48px heading
- **Three cards escalating in weight: grey → black → blue**, each numbered `Ø1 Ø2 Ø3`,
  middle card offset taller. The single best hierarchy device on the site
- Founder story in first person with bold pull-phrases and italic emphasis inline
- Stats `25+ / 20+ / 3-6` as huge pale numerals inside dark cards, staggered vertically
  so the numbers break out of their panels

### 6.7 Contact

A qualifying funnel, not a form.

- `[ contact ]` bracket label, 120px heading
- **Option 01 — Calendly** for people ready to start
- **Option 02 — Inquiry Form** for people still exploring
- **Plus a plain email fallback:** "Or just email us at: …"
- Form grouped `01 | About Your Project`, `02 | About Your Business`,
  `03 | About Yourself` — asking type, goal, **budget**, timeline before anything else
- Field pattern: blue chip label overlapping the input's top border; 1px blue border
- Placeholders carry voice ("Like you're explaining it to a 5-year-old")
- Submit is the split CTA again: `SEND PROJECT REQUEST` + square `↗`
- Success state names a window (24–48 hours) and mentions the spam folder

**Three contact paths, each labelled by reader intent.** This is the model for V3's fork.

### 6.8 Archives

Three-column editorial card grid — custom conceptual cover, date, title, dek. Covers
vary wildly in style (object photography, pixel type, diagrams) but hold the palette.

---

## 7. Images

- Served as **AVIF**, `loading="lazy"` below the fold, `eager` above
- Descriptive alt text ("Intellete Logo - A case study…")
- **No `srcset`/`sizes` anywhere** — a 2000px asset is served to a 224px slot. The one
  clear performance gap

---

## 8. Recurring motifs worth stealing

| Motif | Where |
|---|---|
| `[ bracketed ]` labels | Page labels, email, `[ VIEW ALL PROJECTS ]`, `[ VIEW NEXT ]`, `[ 3 ]` counts |
| `Ø` slashed-zero numbering | Process steps, services, menu items, form groups |
| `//` separator | `Strategy // Structure`, `Design // Experience` |
| Rule-to-link | Heading left, 1px rule across the gap, `LABEL ↗` right |
| Split CTA | Filled button + separate square `↗` button |
| Escalating panel trio | grey → black → blue |
| Crop-mark reticle | Menu hover state |
| Mixed-font word | `THE 404 ARCHIVES` with `404` in the dotted face |
| Chip-on-border label | Every form field |

---

## 9. Defects — observed, not inherited

1. **Zero `prefers-reduced-motion` rules.** Every animation runs regardless.
2. **Scroll-spy nav vanishes on mobile.** Nine screens with no orientation.
3. **No `srcset`.** Oversized assets into small slots.
4. **`No items found.`** Empty collection lists rendering on a live case study.
5. **Menu has no focus trap**, no `Escape` handler, no body scroll lock.
6. **`--dim-text` (#8C8C8C) on `--off-white` (#D9D9D9) is ~2.2:1** — fails WCAG AA,
   and it carries inactive nav and secondary text.
7. **Trial/mislicensed fonts in production** (§1).
