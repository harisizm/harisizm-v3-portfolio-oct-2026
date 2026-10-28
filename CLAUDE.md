# Haris Portfolio V3

Third pass at the portfolio. Ships to **www.harisizm.com**.

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind v4.
Display face Chakra Petch 700 (Google Fonts, OFL), body face Inter.
`npm run dev` / `build` / `typecheck` / `lint`.

This is a design-and-experience project before it is a code project. Every
project is a case study with its own journey.

## Read first, every session

- `design.md` — **the authoritative design spec.** Tokens, grid, type scale,
  components, page architecture, the case-study template. Follow it; if it is
  wrong, change it there first.
- `lessons.md` — decisions already made and dead ends already hit. Read before
  proposing anything that sounds clever.

## Read before building

- `context/v2-post-mortem.md` — what was wrong with V2 and must not repeat.
  Start here. Five headline items are summarised at the bottom.
- `context/repo-context.md` — V2's stack, config, architecture and commit
  history.
- `context/reference-nvrmnd.md` — full UI/UX teardown of the design reference
  (nvrmndstudio.com): measured tokens, grid, type scale, cursor system, motion
  stack, page-by-page flows and click behaviour, plus its defects.
- `context/portfolio-principles.md` — the three practices that separate
  portfolios that convert, from someone who screened 180+ of them. Check work
  against the checklist at the bottom.

## Rules for this repo

- `reference/v2/` is an **archive**. Read it to see how V2 did something; never
  import from it, extend it, or treat it as a starting point. It does not
  compile — see `reference/v2/README.md`.
- `reference/nvrmnd/` is likewise an **archive** — 41 WebP screenshots of the
  design reference, captured 2026-10-27. Read them; never ship them.
- `assets/` holds the only copies of the screenshots, CV and certificates. Don't
  delete or overwrite in place; derive optimised versions alongside.
- Content goes in a data layer, not hardcoded in components. V2's biggest
  structural failure was object literals inside 500-line JSX files.
- No `html { font-size: X% }` hack. V2 set 77% and broke every rem on the site.
- Every interactive element must do something on click, and the primary contact
  path must work without hover and without JS. V2's "Hire me" button had no
  handler at all.
- Honour `prefers-reduced-motion` on every animation from the start.
- **No em dashes and no en dashes anywhere a visitor can read.** Not in the
  data layer, not in component copy, not in metadata. Where a dash was doing
  the work of a clause, write the clause. Hyphens inside compound words
  (full-stack, eight-hour) are fine. Code comments are exempt.
- **Write like a writer, not a bot.** Full sentences with a rhythm, specific
  nouns, no hard cuts, no fragments stapled together with punctuation. If a
  line would not survive being read aloud, rewrite it.
- **Never leave a dev server running.** Haris starts the server himself in his
  own VS Code terminal. Start one only when a change genuinely has to be seen in
  a browser, then kill the whole process tree and confirm the port is free.
  Prefer `npm run build`, `npm run typecheck` and `npm run lint` — none of them
  hold a port. A stale server steals port 3000 and leaves orphaned node
  processes behind.
- Budget images. V2 shipped ~8 MB of PNGs; three project screenshots in
  `assets/projects/` are still over 900 KB and need re-exporting as WebP.

## Decisions settled (2026-10-27)

Full reasoning in `lessons.md`. Don't reopen these without a new entry there.

- **Audience: freelance clients first.** Recruiters get a labelled second path
  in the contact fork, not their own site. (D-001)
- **Visual direction: near-replica of nvrmndstudio.com** — grey canvas, two
  accents, pixel display face, visible column rules. (D-002)
- **Name: "Haris" in prose, `harisizm` as the wordmark.** Full legal name on
  the CV and in the footer only. (D-003)
- **Every project gets a full case study.** The template is data-driven, not
  hand-built pages. More and stronger projects are coming. (D-004)
- **Display face is Chakra Petch 700, body face Inter**, behind
  `--font-display` / `--font-body`. Departure Mono was retired on 2026-10-28
  after the audit; the site is engineered, not retro. (D-005, D-015)
- **`assets/docs/cv.pdf` has been read.** Findings and the conflicts it exposed
  are in `lessons.md` T-012.

## Decisions still open

Ask before assuming any of these:

- The hero line. It must say something only Haris could say — see
  `context/portfolio-principles.md`.
- Framework. Next.js is the reasonable default, but nothing in `design.md`
  depends on it.
- Whether the two non-technical jobs stay in the work history, and where. Note
  the CV already drops the SBI email-marketing role and promotes TransGPA and
  the Timetable Generator into `EXPERIENCE`.
- Whether to publish the phone number from the CV. V2 never did.


## Waiting on Haris

Build continues without these; they slot into existing nulls and stubs. Nothing
here should be guessed, invented, or worked around with a placeholder that
renders.

- [ ] **Decide** whether `skills.ts` keeps "TLS impersonation" and
      "GraphQL scraping" verbatim, or softens them.
- [ ] **Booking URL** if one is wanted. `site.booking` is `null`.
- [ ] **Re-export the CV**: wrong email (`haris687.chohan@` vs the real
      `hariszim01@`) and it still points at `harisifti.vercel.app`.
- [ ] **Diagrams.** Five board slots are drawn by `/diagram` when wanted:
      Client Hunt expansion grid and dedupe store, TransGPA and Khilariverse
      architecture, plus the three home-page process diagrams.

### Resolved 2026-10-28

- **Hero line.** "EIGHT HOURS / OF WORK, DONE IN / TEN MINUTES." chosen by
  Haris. Alternates remain in the comment at the top of `Hero.tsx`.

- **Sign-off.** All four employer case studies approved as written by Haris on
  2026-10-28 (Tourgenz, Client Hunt, Instagram Lead Generator, Upwork
  platform). `approvalStatus` is "approved" on all six; `approvedProjects()`
  now returns everything.

- **Repo links.** All four non-public repos (Tourgenz, Instagram, Client Hunt,
  TransGPA) show a one-line note in place of a Source link; the employer ones
  cite client constraints, TransGPA just says the code is not public.
- **Covers and boards.** All six projects have a real cover and image boards
  between sections. Sources: tourgenz.com live; the Instagram folder on the
  Desktop (new 29 June set); the Upwork GitHub repo; Client Hunt run locally
  from `Desktop/marketing` and captured; the live TransGPA and Khilariverse
  sites. See T-016 for what was deliberately excluded.

## V2 reference

Retired, but still on GitHub if a config or icon is needed:
https://github.com/harisizm/Haris-s-Portfolio-V2 (last commit `bf5c704`).

## Skill routing

Full reference with the reasoning: `.claude/skills.md`. Skills live in the
global install — **never vendor them into this repo** (`lessons.md` T-013).

The three that carry this project:

- **Visual QA on the running app → `/design-fix`.** Catches dead buttons,
  off-token colours, contrast failures, overflow and bad touch targets — the
  exact V2 defect classes. Never fixes before approval: findings become
  questions, only approved fixes get made, then re-audit to prove it gone.
- **Anything about the reference site, or verifying live URLs → `/browse`.**
  Measure, don't guess.
- **Craft-evidence boards inside case studies → `/diagram`.** Architecture,
  data flow, the Grocery POS EER diagram. SVG, not another raster asset.

Everything else:

- Shape a feature before building → `/spec`
- Plan review → `/plan-design-review`, `/plan-eng-review`
- Bugs → `/investigate`
- Craft/polish pass on built UI → `/design-review`
- Any chart or stat tile → read `dataviz` **before** writing chart code
- Diff review → `/code-review`; cleanup → `/simplify`
- Functional QA → `/qa`, or `/qa-only` to report without fixing
- Page-weight budget → `/benchmark`
- Ship → `/ship`, `/land-and-deploy`
- Session continuity → `/context-save`, `/context-restore`
- Re-export the CV → `/make-pdf`

Do **not** run `/design-consultation` — the design system is settled (D-002).
Do **not** use `ultra` or `max` review effort unless explicitly asked.
