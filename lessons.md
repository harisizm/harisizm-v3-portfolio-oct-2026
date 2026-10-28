# Lessons & Decisions

A rolling log so the same ground never gets covered twice. Two halves:

1. **Decisions** — what was decided, when, why, and what it rules out.
2. **Dead ends & traps** — things already tried, already known to fail, or known to
   cost more than they return. Read before proposing anything that sounds clever.

**Append, never rewrite.** If a decision is reversed, add a new entry that supersedes
the old one and mark the old one. The history is the point.

---

## How to use this file

- Claude reads this at the start of any session that touches design or architecture.
- Anything that changes `design.md` gets an entry here first.
- "We tried X and it didn't work" belongs in §2 the moment it happens, not later.
- Open questions live in `design.md` §13 until answered, then move here as a decision.

---

# 1. Decisions

### D-001 · Audience: freelance clients first
**2026-10-27**

harisizm.com is built to convert **freelance clients**, not primarily recruiters.

**Why:** chosen directly. The domain purchase, the choice of an international
client-acquisition site as the model, and the stated goal of client work all point
the same way.

**Consequences:**
- The hero sells an outcome, not a job title.
- Case studies argue value, not just technical competence.
- Contact asks budget and timeline, the way the reference does.
- Recruiters are *not* ignored — they get a labelled second path in the contact fork
  (`design.md` §9.3) rather than their own site.

**Tension to watch:** there is no paid client work yet. Every case study is
self-initiated. The writing has to be honest about that — see T-003.

---

### D-002 · Visual direction: near-replica of nvrmndstudio.com
**2026-10-27**

V3 adopts the reference's visual language closely: `#D9D9D9` canvas, `#222` ink,
`#033FED` + `#BEFD66` as the only accents, a pixel display face paired with a neutral
body face, visible dotted column rules, pixel cursors, and the full interaction
grammar (bracket labels, `Ø` numbering, split CTAs, crop-mark reticle).

**Why:** chosen directly, with the derivative risk stated up front and accepted.

**Known risk, recorded not relitigated:** anyone who knows nvrmndstudio.com will
recognise the lineage. The counter — which is the reference article's own argument —
is that the mould is not what makes a portfolio work. The content poured into it is.
See `context/portfolio-principles.md`. **This raises the bar on writing, not lowers it.**

**Explicitly rejected:** keeping V2's dark + emerald/sky look. It came from a template
and nothing original was at stake in it.

---

### D-003 · Name: "Haris" in prose, `harisizm` as the wordmark
**2026-10-27**

Resolves V2's contradiction, where the page title said "Haris Iftikhar" and the hero
said "Hafiz Muhammad Haris".

- **Wordmark / logo:** `harisizm` — already the domain and every social handle
- **Running copy:** "Haris"
- **Full legal name:** CV, footer, and structured metadata only

**Follow-up:** the CV header reads "Hafiz Muhammad Haris". That is correct for a CV
and does not need changing. The site simply must not claim a third name.

---

### D-004 · Every project gets a full case study
**2026-10-27**

No tiered treatment. The `Overview → Challenge → Approach → Outcome → Evidence`
template applies to every project on the site.

**Why:** chosen directly, with the note that stronger, newer projects are coming and
that those are *already* case studies in their own right.

**Consequences:**
- The case-study template must be a **data-driven component**, not six hand-built
  pages. Adding a project is adding a data entry plus assets.
- Some of the V2 six may not survive the bar. A project that cannot sustain a real
  Challenge and a real rejected alternative is a candidate for cutting rather than
  padding — better five strong case studies than nine thin ones.
- Writing is now the critical path, not code.

**Pending:** the newer projects have not been supplied yet. The data layer ships
first; entries get added as material arrives.

---

### D-005 · Substitute both reference typefaces for licensing reasons
**2026-10-27**

Near-replica stops at the font files.

- **Off-Bit** (Power Type Foundry) is free for personal use only; commercial use is
  roughly $70–90 for six styles. The reference serves a cut literally named
  `Offbittrial` in production.
- **SF Pro Display** is licensed by Apple for interface design on Apple platforms.
  Serving it as a web font on a commercial site falls outside that licence.

**Decision:** build with **Departure Mono** (free, open) + **Inter** (SIL OFL) behind
`--font-display` / `--font-body` tokens. Off-Bit can be bought later and swapped in
with a one-line token change.

**Why this is not negotiable:** harisizm.com sells services. That is commercial use,
and a font licence is the cheapest possible thing to get wrong.

---

### D-006 · Reference screenshots stored as WebP
**2026-10-27**

41 screenshots of the reference site live in `reference/nvrmnd/`, converted PNG → WebP
at quality 80: **13.3 MB → 2.2 MB**.

**Why:** they are genuinely useful during the build, and re-capturing them costs a
browser session. But this repo's own rules budget images, and 13 MB of PNGs in git
would repeat the exact V2 mistake the post-mortem documents.

`reference/nvrmnd/` is an **archive**, same status as `reference/v2/` — read it, never
import from it.

---

# 2. Dead ends & traps

Things already known to be wrong. Each one cost something to learn.

---

### T-001 · Never scale the root font size
**From V2 · post-mortem item 1**

V2 opened `globals.css` with `html { font-size: 77% }`. Every `rem` in the app — so
every Tailwind spacing, sizing and type utility — silently became 77% of its documented
value. `text-lg` was not 18px. `p-8` was not 32px.

Consequences that followed: Tailwind's scale became unreliable, so the codebase filled
with compensating arbitrary values (`h-[240px]`, `min-h-[60px]`, `text-[10px]`); and a
user who raises their browser's base font size got 77% of the increase they asked for.

**If the type scale feels wrong, change the scale in config where it stays inspectable.**

---

### T-002 · A control that does nothing is worse than no control
**From V2 · post-mortem item 3**

V2's **"Hire me" button had no `onClick` and no `href`.** The single most important
conversion control on the site rendered a hover state and nothing else. The Grocery POS
"Live Demo" button pointed at `#` and scrolled to the top. Hobby pills were draggable
for no reason and with no affordance suggesting it.

**Rule:** every interactive element resolves to a real destination or a real effect.
Where there is no destination — a project with no deployment — **the control does not
render at all.** That is why `Project.live` is `string | null` in the data layer.

---

### T-003 · Do not manufacture social proof
**New · 2026-10-27**

The reference closes every case study with **Client Notes** — a real testimonial from a
paying client. These projects are self-initiated and have none.

**Do not** write a plausible-sounding quote, attribute feedback to an unnamed "user",
or leave an empty testimonial slot in the template.

**Instead**, the slot is called **Evidence** and takes what actually exists: usage
numbers (100+ students on TransGPA, 60+ on the timetable generator), genuine
unsolicited feedback if any can be produced, or a screenshot of the thing in real use.
Real client testimonials drop into the same slot when they arrive.

---

### T-004 · Don't let the strongest evidence sit below the weakest
**From V2 · post-mortem item 5**

V2's order ran Hero → Projects → Education → Experience → About → Contact. That put a
degree finishing in 2027 above the work history, and put a chat-support role and a
2-month email-marketing role — neither of them engineering — in prime position, where
they competed with shipped apps that have real users.

Note that **the CV already fixed this**: it promotes TransGPA and the Timetable
Generator into `EXPERIENCE` and drops the SBI email-marketing role entirely. The site
should follow the CV's lead, not V2's.

---

### T-005 · One implementation per interaction
**From V2 · post-mortem items 2 and 8**

The "hover a button, fan out social icons, click to copy the email, show a toast" flow
was implemented **in full, twice** — in `Hero.tsx` and again in `Contact.tsx` — with
duplicated state, duplicated timeout effects, duplicated inline SVG paths and duplicated
hardcoded pixel offsets. `Projects.tsx` defined a local `TechIcon` while
`components/TechIcon.tsx` already existed. `Hero.tsx` reached **529 lines**.

**Rule:** one `SocialLinks`, one `useCopyToClipboard`, one `Toast`, one `TechIcon`. The
email address is a single config constant. Section components do layout and data
mapping; behaviour lives in hooks.

---

### T-006 · Don't hand-roll positioning logic
**From V2 · post-mortem item 4**

V2's CV preview panel hand-computed its own placement with ~40 lines of
`getBoundingClientRect` maths, viewport clamping, three transform origins and a branch
for insufficient space above. That is a popover library, reimplemented badly.

**Use a real primitive** (Radix, Floating UI) for anything that needs to position
itself relative to something else.

---

### T-007 · Design the touch path first
**From V2 · post-mortem item 4**

V2's entire contact mechanism was hover-driven, and hover-only tooltips carried the
only labels for tech-stack icons and social buttons — invisible on touch. The breakpoint
set stopped at `lg: 1024px` while `Projects.tsx` separately opted into a
`max-w-[1400px]` container, so the grid and the container disagreed about how wide the
site was.

Related, from the reference: its case-study **scroll-spy nav disappears entirely on
mobile**, on a nine-screen page. Don't inherit that — `design.md` §9.2 specifies a
sticky progress indicator in its place.

---

### T-008 · Budget images from the first commit
**From V2 · post-mortem item 6**

~8 MB of a 21 MB repo was images, mostly PNG. A 1.4 MB logo used as a *blurred card
background*. A 1.1 MB decorative static map. A 176 KB grain JPEG loaded on **every**
card. Several rendered with Next's `unoptimized` flag, disabling the image pipeline
entirely. Each project card decoded its screenshot **twice** — once blurred as a
background wash, once sharp.

Still outstanding in `assets/projects/`: `zayr.png` (1.3 MB), `zayrah.png` (1.3 MB),
`Khilariverse.png` (936 KB). Filenames with spaces need kebab-casing.

**Derive optimised copies alongside the originals. Never overwrite `assets/` in place.**

---

### T-009 · Reduced motion is not a polish task
**From V2 (item 9) and the reference**

V2 ran infinite marquees and multiple `animate-ping` loops with **no
`prefers-reduced-motion` guard anywhere in the codebase**. The reference site has
**zero** such rules either — measured, not assumed.

Both sites get this wrong, so there is no example to copy from. It goes in with the
first animation, not after.

**Second-order trap:** a reveal animation that starts at `opacity: 0` and is driven by
JS leaves content permanently invisible if the script fails or is blocked. Animate from
a visible final state, or apply the hidden class *via JS* on load.

---

### T-010 · Content in components is a one-way ratchet
**From V2 · post-mortem item 7**

Projects, toolbox, hobbies, experience, education and certifications were object
literals and raw markup inside the components that rendered them. Editing one project
bullet meant editing a 240-line component.

`context/projects.md` already ends with a JSON block built to seed the data layer. Use
it. With D-004 committing every project to a full case study, this stops being a
preference and becomes structural — nine hand-built case-study pages would be
unmaintainable.

---

### T-011 · Verify the deployments before trusting the links
**New · 2026-10-27**

Five of the six V2 projects link to free-tier Vercel or Streamlit deployments.
Streamlit apps sleep after inactivity; Vercel projects get deleted. The reference
article names broken portfolio links as a specific thing that lost applicants
credibility.

**Check every URL immediately before launch, and again periodically.** A dead "Live
Demo" is worse than no live demo — and per T-002, no deployment means no control.

---

### T-012 · The CV and the site must not disagree
**New · 2026-10-27 · from the first in-session read of `assets/docs/cv.pdf`**

The CV was read for the first time on 2026-10-27 and contains material the site never
had, plus one direct conflict:

| Fact | CV | Site/context |
|---|---|---|
| Portfolio URL | `harisifti.vercel.app` | `haris-portfolio-v2.vercel.app` |
| Phone | `+92 300 9495926` | never published |
| CGPA | 2.92 | never shown |
| SBI email-marketing role | **absent** | present in `context/experience.md` |
| TransGPA, Timetable Generator | under `EXPERIENCE` | under Projects |
| Pre-Medical, SSC 93%, Bronze Medalist | present | absent |
| Extra project | "Fundamental JavaScript Projects" (Sep 2025) | absent |
| Stack extras | C++, Next.js, pdfjs, Openpyxl, Pillow, NumPy, Redux Toolkit | absent from V2 toolbox |

A recruiter opens both. **Re-export the CV once the site is live** so the portfolio URL
reads `harisizm.com`, and reconcile anything else that still disagrees.

Recommended: CGPA stays off the site. Phone is a deliberate choice — clients-first is
an argument for publishing it.

---

### T-013 · Don't vendor the gstack skills into this repo
**New · 2026-10-27**

The tempting move when asked to "import useful skills" is to copy skill directories
into `.claude/skills/`. The gstack skill docs mark vendoring as **deprecated** and warn
on detection — a vendored copy goes stale against the global install and silently
diverges.

**Instead:** `.claude/skills.md` is a routing reference that maps situations to the
globally-installed skills. Nothing is copied; nothing goes stale.

---

### D-007 · New CV supersedes all V2 content
**2026-10-27 · `assets/docs/cv-2026-10.pdf`**

A new CV replaced the old one mid-project and changed the subject matter completely.

**What changed:** two real engineering roles (Web7Labs, Full-Stack SE, July 2026 –
present; Bitbash, SE Intern, May–July 2026), a live production platform
(tourgenz.com), and three substantial automation systems. Positioning moved to
*"backend engineering, AI-integrated platforms, and scalable data pipelines."*
Stack deepened enormously — FastAPI, GraphQL, Prisma, PostGIS, pgvector, OpenRouter,
RAG, SSE streaming, TLS impersonation, Vitest, Sentry.

**What it dropped:** Zayr, Zayrah, Grocery POS, Timetable Generator, the Mindbridge
chat-support role and the SBI marketing role. T-004's open question is now closed —
the CV answered it by deletion.

**Consequence:** all five V2 context files were removed (D-008). Nothing about the
old six projects is authoritative any more except where the new CV repeats it
(TransGPA, Khilariverse).

---

### D-008 · Repository cleaned to match the new CV
**2026-10-27**

Removed with explicit approval: `assets/brand/` (2.7 MB of V2 decoration),
memoji + `cert-image.png` (758 KB), `context/{projects,experience,skills,profile,copy-deck}.md`,
the old `cv.pdf`, and `reference/v2/`.

**11 MB → 7.3 MB.**

**Deliberately kept:** the four dropped-project screenshots in `assets/projects/`
(zayr, zayrah, grocery pos, timetable generator — ~3 MB) were *not* approved for
deletion. They are not referenced by any current project. Either an archive section
is planned for them or they can go later; do not assume and delete.

Also kept: `context/v2-post-mortem.md` and `context/repo-context.md` — the record of
what went wrong, which is still the reason half of `design.md` reads as it does.

---

### D-009 · Project lineup: all six from the new CV
**2026-10-27**

Tourgenz · Instagram Lead Generator · Upwork Job Intelligence & SEO Publishing ·
Client Hunt · TransGPA · Khilariverse.

Four are employer work — Tourgenz and Client Hunt are Web7Labs; the Instagram and
Upwork platforms are Bitbash. See T-014.

---

### D-010 · Audience: clients first, led by the production work
**2026-10-27 · supersedes the framing in D-001, not its direction**

Still clients-first. But the proof is now Tourgenz and the automation platforms, not
student projects. Position as *someone who ships real production systems, sold to
clients* — not as a student with side projects.

---

### D-011 · Stack: Next.js 15 + TypeScript strict + Tailwind v4
**2026-10-27**

Matches the daily stack at Web7Labs, so the portfolio is itself consistent with what
the CV claims. App Router, statically generated case studies, `next/image` for the
AVIF pipeline.

---

### D-012 · Fonts confirmed: Departure Mono + Inter
**2026-10-27 · confirms D-005**

Both free. Off-Bit can be bought later and swapped behind `--font-display` with no
other change.

---

### D-013 · Contact details to publish
**2026-10-27**

- **Email: `hariszim01@gmail.com`** — *not* the `haris687.chohan@gmail.com` on the CV
- Phone: `+92 300 9495926` — published, a change from V2
- LinkedIn `/in/harisizm`, GitHub `/harisizm`
- A booking link — slot built and configurable; URL not supplied yet

**Follow-up:** the CV must be re-exported. It currently carries the wrong email *and*
points at `harisifti.vercel.app` instead of `harisizm.com`. Two conflicts, one export.

---

### D-014 · Proof strategy
**2026-10-27 · refines T-003**

Evidence comes from live links, screen recordings, and the CV's real metrics
(~2,000 tests / 214 files, 8,445 geospatial cells, 10,000 profiles in 24h,
8-hour day → ~10 minutes, 100+ students).

A quote is being sought from Web7Labs or Bitbash. The testimonial slot is built so a
real quote drops in later **without a redesign**. T-003 still stands: nothing invented.

---

### T-014 · Employer work needs per-project approval before publishing
**2026-10-27 · standing constraint**

Four case studies describe work owned by Web7Labs or Bitbash. **Draft each one, then
get explicit approval on its detail level before it ships.** Do not publish employer
case-study copy on the assumption that last time's approval generalises.

Specific sensitivity: the Upwork and Instagram platforms involve Cloudflare Turnstile
bypass, reverse-engineered internal GraphQL APIs and TLS impersonation. Naming those
techniques on a commercial site carries ToS and client-perception risk. Default to
framing the *outcome and architecture*, and raise the detail question explicitly when
each draft goes up for approval.

---

### D-015 · Display face: Chakra Petch 700
**2026-10-28 · supersedes D-005 / D-012**

The reference-parity audit (`context/audit-2026-10-28.md`, A2) showed that
Departure Mono, a monospace *text* face, cannot carry the display roles: at 96px
in the menu and 276px in the footer it read as terminal output, with monospace
gaps between letters. Five candidates were mocked in every display role
(Pixelify Sans, Handjet, Sixtyfour, DotGothic16, Chakra Petch).

**Chosen: Chakra Petch 700**, a squared technical sans that is not a pixel face.
The site reads engineered rather than retro. Loaded through `next/font/google`
as `--font-chakra`; only the 700 cut, since every display role is bold.

**Consequences:** Departure Mono and its licence file are removed from
`public/fonts/`. The pixel-art cursors are redrawn as clean vectors so the
system stays coherent. The `.u-pixel` class keeps its name for now; it means
"small display-face label", not "pixel".

---

### T-015 · No em dashes, no en dashes, in anything a visitor reads
**2026-10-28 · standing rule from Haris**

Nowhere in the data layer, component copy or metadata. A dash that was
splicing two thoughts becomes a proper sentence, a colon, or a comma followed by
a real clause. Hyphens inside compound words are fine. Code comments are exempt.

**Why:** dashes are the signature of generated prose: hard cuts standing in for
sentences that were never written. The site should read as written by a person.

**How to apply:** grep `src/` for `—` and `–` before every commit; the copy pass
on 2026-10-28 removed the ones already there. New copy is written without them
from the start, and read aloud once before it ships.

---

### T-016 · Screenshots of real systems carry real people; check before publishing
**2026-10-28 · standing rule from the media pass**

The media for the case studies came from working systems, so the frames held
real data. Excluded or masked on sight:

- The Instagram Leads page and lead modal: real Instagram handles, names,
  follower counts and one personal email of scraped third parties. **Never
  publish scraped personal data**, even behind a case study.
- Client Hunt's activity log: two hostels' phone numbers. Masked in the image
  with a drawn bar; the Excel board uses the already-masked sample export, not a
  real export.
- The Upwork site captures: full browser chrome with a colleague's Slack DM and
  GitHub handle in the tab strip. Cropped to the page viewport.
- `developer/logs` captures with account usernames in the filenames: left out
  entirely.

**How to apply:** view every candidate image before converting it; crop browser
chrome; mask phone numbers and emails; prefer the system's own sample or demo
data over production rows; and when a screen is nothing but other people's
data, do not use it however good it looks. The Chakra Petch display face and the
canvas-coloured mask bar make a masked span read as deliberate, not as damage.

