# Haris Portfolio V3

Working repo for the third pass at the portfolio. Right now it holds **context
only** — no app code yet. Everything here was salvaged from Portfolio V2 before
that folder was deleted (archived 2026-10-27).

## What is in here

```
context/            the facts, as markdown — read these first
├── profile.md      name, contact, positioning, headline copy
├── projects.md     all 6 projects: bullets, links, stacks (+ a JSON block)
├── experience.md   jobs, degree, certification
├── skills.md       18-item toolbox, hobbies, suggested regrouping
├── copy-deck.md    every user-facing string V2 shipped, with its typos flagged
├── v2-post-mortem.md   10 structural problems in V2 — the do-not-repeat list
└── repo-context.md     V2's stack, architecture, config and commit history

assets/             the real files — these cannot be regenerated
├── projects/       6 project screenshots (3 need re-compressing)
├── personal/       profile photo + 2 memojis
├── docs/           cv.pdf, Coursera certificate PDF, certificate image
└── brand/          grain texture, Lahore map, UOL + Mindbridge logos, book cover

reference/v2/       V2 source kept to look back at, NOT to build on
├── sections/       all 8 section components + the old page.tsx (as _page.tsx)
└── components/     Card, CardHeader, SectionHeader, HeroOrbit, ToolboxItems,
                    TechIcon, ScrollToTop, smoothScroll
```

## How to use it

1. **`context/v2-post-mortem.md` first.** It is the list of what went wrong and
   why — the reason V3 exists. Five headline items are summarised at the bottom.
2. **`context/projects.md` + `experience.md` + `profile.md`** are the content.
   `projects.md` ends with a JSON block ready to drop into a data layer.
3. **`context/copy-deck.md`** when writing V3 copy, so the rewrite is deliberate
   rather than accidental.
4. **`reference/v2/`** only when you want to see how V2 did something. Treat it
   as an archive. The code in there does not compile as-is — see the note in
   `reference/v2/README.md`.

## Known decisions still open

- Audience: employers or freelance clients? V2's copy hedged both.
- Display name: the V2 page title said "Haris Iftikhar" while the hero said
  "Hafiz Muhammad Haris". Pick one.
- Whether to keep V2's visual language (dark + emerald/sky gradient + grain) or
  start fresh. The V2 look came from a template, so there is nothing owned to
  protect.
- Whether the non-technical work history stays, and where.
- `assets/docs/cv.pdf` was never read during the archive — open it and reconcile
  against `context/experience.md` before writing V3 content.

## Status

- [x] V2 content and assets archived
- [x] V2 post-mortem written
- [ ] V3 design direction chosen
- [ ] V3 app scaffolded
