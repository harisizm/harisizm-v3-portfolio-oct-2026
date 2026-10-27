# Reference Screenshots — nvrmndstudio.com

Captured 2026-10-27 in headless Chromium. Desktop at **1440×900**, mobile at
**390×844**. Converted PNG → WebP q80 (13.3 MB → 2.2 MB).

**This is an archive.** Read it to see how the reference solved something. Never
ship these, never import from them. Same status as `reference/v2/`.

The written teardown is [`context/reference-nvrmnd.md`](../../context/reference-nvrmnd.md);
the spec derived from it is [`design.md`](../../design.md).

Filenames carry the scroll offset in pixels, so `home-3400` is the home page at
`scrollY = 3400`.

---

## Home — `home-*` (page is 10,267px, 11.4 screens)

| File | What's in frame |
|---|---|
| `home-0` | Hero. Lime logo chip, status pill, `+ MENU`, 120px two-weight headline, split CTA, fixed bottom rail |
| `home-850` | About statement, rule-to-link, inline pixel-hand glyph |
| `home-1700` | Work card 1 (Intellete) — left text column, right art-directed image |
| `home-2550` | Work card 2 (Words-Hurt) |
| `home-3400` | Work card 3 (Alfi) + the dark `[ VIEW ALL PROJECTS ]` panel |
| `home-4250` | **Process section** — `Ø1 Ø2 Ø3`, MAP/MAKE/MOVE, line-art diagrams |
| `home-5100` | **Services row pattern** — number, title, long rule, duration |
| `home-5950` | Services rows 2–3 |
| `home-6800` | **Testimonial layout** — device photo + floating case-study card + quote |
| `home-7650` | Testimonials continued |
| `home-8500` | Newsletter — mixed-font `THE 404 ARCHIVES`, magazine mockup |
| `home-9350` | Newsletter form |
| `home-10200` | **Footer** — giant dotted-face wordmark, bracketed email |

## Menu overlay — `menu-*`

| File | What's in frame |
|---|---|
| `menu-open` | Full-viewport blue overlay. Nav at 96px pixel face, `Ø1`–`Ø4` in lime, **crop-mark reticle on HOME**, socials, bracketed email, chip-on-border form |
| `menu-hover-work` | Same, hovering WORK — **the reticle has moved to WORK**. Proof it's one element moving, not four fading |

## Work index — `work-*`

| File | What's in frame |
|---|---|
| `work-0` | **Sticky left column** + first project image. The dark "Want to discuss a project?" card pinned bottom-left |
| `work-850` | Rail still pinned, second project scrolling past |
| `work-1700` | Rail still pinned, third project. Demonstrates persistent context + scrolling evidence |

## Case study — `cs-*` (`/work/intellete`, 8,256px)

The most important sequence here.

| File | What's in frame |
|---|---|
| `cs-0` | **Sticky rail**: Back, title, description, View Live + scroll-spy nav pinned bottom-left |
| `cs-800` | **Overview** — the signature rhythm: big 51px left block, smaller right-aligned continuation |
| `cs-1600` | Image evidence, 2-up grid |
| `cs-2400` | Full-bleed art-directed image |
| `cs-3200` | Challenge section |
| `cs-4000` | Challenge imagery. **Scroll-spy now shows `▪ Challenge` active** |
| `cs-4800` | Strategy imagery |
| `cs-5600` | **Our Strategy** — numbered sub-headings, narrow offset text column |
| `cs-6400` | Strategy continued |
| `cs-7200` | **Craft-evidence boards** — colour palette with hex codes, type specimen sheet |
| `cs-8000` | **The Outcome** + **Client Notes** — small grey label left, content right |
| `cs-bottom` | **Next Up** — Back, `[ VIEW NEXT ]`, next project + hero image, contact card. Three exits |

## Case study on mobile — `m-cs-*` (390×844)

| File | What's in frame |
|---|---|
| `m-cs-0` | Sticky rail collapsed to a static header. **Tag chips appear only at this width** |
| `m-cs-1200` | Right-aligned continuation paragraph survives the breakpoint |
| `m-cs-3000` | Stacked image evidence. Note the scroll-spy nav is **gone entirely** — the gap V3 fixes |

## About — `about-*`

| File | What's in frame |
|---|---|
| `about-0` | Hero |
| `about-900` | **Escalating card trio: grey → black → blue**, numbered. Best hierarchy device on the site |
| `about-1800` | Founder story, first person, bold pull-phrases |
| `about-2700` | **Stat treatment** — huge pale numerals breaking out of dark panels |

## Contact — `contact-*`

| File | What's in frame |
|---|---|
| `contact-0` | `[ contact ]` label, 120px heading, **chip-on-border form fields**, grouped `01 \| About Your Project` |
| `contact-700` | Groups 02 and 03, split-CTA submit, plain email fallback |

## Archives — `archives-*`

| File | What's in frame |
|---|---|
| `archives-0` | Index hero |
| `archives-800` | Three-column editorial card grid with custom conceptual covers |
