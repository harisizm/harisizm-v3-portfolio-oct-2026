# Skill Routing — Haris Portfolio V3

Which installed skill to reach for, when, and why — mapped to the phases this project
actually goes through.

**Nothing is vendored into this repo.** These all live in the global install at
`~/.claude/skills/`. Copying them here would go stale against the global version, and
the gstack docs mark vendoring as deprecated — see `lessons.md` T-013. Invoke them
with the Skill tool (`/name`); they resolve globally.

---

## The ones that matter most here

This is a design-and-experience project. Three skills carry most of the weight.

### `/design-fix` — the primary visual QA loop
`~/.claude/skills/design-fix/`

Measures the **running** app in headless Chromium and reports real defects: overlapping
or covered elements, horizontal overflow, clipped text, fonts that are wrong-sized,
colours that are off the design tokens, low contrast, broken images, **dead buttons**,
bad touch targets.

**Use it when:** "see the design and fix it", "check the design", "visual QA", or any
report of things overlapping, overflowing, or looking wrong.

**Why it matters for V3 specifically:**
- It catches **dead buttons** — the exact V2 failure in `lessons.md` T-002.
- It catches **colours off the tokens** — which is how the two-accent discipline in
  `design.md` §2 stays enforced rather than aspirational.
- It catches **contrast failures** — relevant because `--dim` on `--canvas` is ~2.2:1
  and fails WCAG AA (`design.md` §11).
- It checks **touch targets**, and touch-first is a hard requirement here (T-007).

**Rules of engagement** (from the global CLAUDE.md, repeated because they matter):
never fix directly — present findings and proposed fixes as questions, wait for
approval, fix only what was approved, then re-audit to prove it gone. OWNER CALL
findings are choices, never decisions. Read the summary, `--show` only the groups being
acted on, never full-page screenshots. **Never start a dev server for it.**

**Setup:** needs `.claude/design-fix.json` with `baseUrl`, `startCommand`, `routes`,
`appDir`. Not created yet — there is no app. Create it on the first run, with routes
`/`, `/work`, `/work/[slug]`, `/about`, `/contact` per `design.md` §9.

---

### `/browse` — the headless browser
`~/.claude/skills/browse/`

Already used to produce `context/reference-nvrmnd.md` and the 41 screenshots in
`reference/nvrmnd/`.

**Use it for:**
- Re-checking anything about the reference site without guessing
- **Verifying every project's live URL still resolves** before launch — `lessons.md`
  T-011, a standing requirement
- Responsive checks (`responsive`, `viewport 390x844`)
- Measuring the real page weight against the <1 MB budget (`perf`, `network`)
- Confirming a fix actually landed (`snapshot -D` diffs before/after an action)

Binary is at `~/.claude/skills/gstack/browse/dist/browse`. Screenshots must be `Read`
afterwards or they are invisible.

---

### `/diagram` — the craft-evidence boards
`~/.claude/skills/diagram/`

Turns an English description (or Mermaid source) into an editable `.excalidraw` file
plus rendered SVG and PNG.

**This is how `design.md` §9.2's craft-evidence boards get made.** The reference shows
colour-palette boards and type specimens between case-study sections; the engineering
equivalents are diagrams, and this produces them as SVG rather than as another heavy
raster asset.

Immediate candidates:
- The **EER diagram** for Grocery POS — named explicitly in the CV, so it exists
- Architecture / data-flow for Khilariverse
- TransGPA's client-side parsing flow — the diagram that makes the privacy decision legible
- Role-based access matrices

---

## By phase

### Shaping work before building

| Skill | When |
|---|---|
| `/spec` | Turning a vague intent into an executable spec. Good for "build the case study template" — a well-shaped, reusable component. |
| `/plan-design-review` | A designer's-eye review of a plan before any code. Worth it for the case-study template and the menu overlay. |
| `/plan-eng-review` | Architecture review — the data layer shape (`design.md` §10) is the one worth running it on. |
| `/office-hours` | Product/positioning questions. Relevant to the hero line, which is still open. |

**Not needed:** `/design-consultation`. It proposes a full design system — that is
already settled by `lessons.md` D-002 and specified in `design.md`. Running it would
reopen a closed decision.

### Building

| Skill | When |
|---|---|
| `/investigate` | A bug whose cause isn't obvious. Root-cause first, rather than patching symptoms. |
| `/design-review` | Designer's-eye pass on built UI — spacing inconsistency, hierarchy problems, AI-slop patterns, slow interactions. Complements `/design-fix`: that one measures defects, this one judges craft. |
| `/dataviz` | **Before writing any chart code.** Relevant if TransGPA's Recharts dashboards get rebuilt or screenshotted, and for any metric display in a case study. |
| `/make-pdf` | Re-exporting the CV so its portfolio URL reads `harisizm.com` — `lessons.md` T-012. |

### Before shipping

| Skill | When |
|---|---|
| `/code-review` | Review the diff for correctness bugs. Default effort; `ultra`/`max` only if explicitly asked. |
| `/review` | Pre-landing PR review. |
| `/qa` / `/qa-only` | Systematic functional QA of the running app. `/qa-only` reports without fixing. |
| `/benchmark` | Performance regression against the **<1 MB page weight budget** in `design.md` §12. |
| `/security-review` | Worth one pass once the contact form exists and handles real submissions. |
| `/simplify` | Reuse/simplification cleanups. Directly targets `lessons.md` T-005 — the duplicated-component failure. |

### Shipping & deploying

| Skill | When |
|---|---|
| `/ship` | Merge base, run tests, review diff, bump version, update changelog, commit, push, open PR. |
| `/land-and-deploy` | The deploy workflow. |
| `/setup-deploy` | One-time deployment config — **after** the domain is bought and the host is chosen. |
| `/canary` | Post-deploy monitoring. |

### Session continuity

| Skill | When |
|---|---|
| `/context-save` | Before ending a long working session. |
| `/context-restore` | Resuming one. |
| `/learn` | Managing project learnings — complements `lessons.md`; that file stays the human-readable record of record. |

---

## Anthropic skills worth knowing about

| Skill | When |
|---|---|
| `dataviz` | Any chart, graph, dashboard or stat tile, in any medium. Read **before** the first line of chart code. |
| `artifact-design` | Before building any shareable Artifact page — e.g. a design-token preview or a case-study draft for review. |
| `pdf` | Reading or producing PDFs — `assets/docs/cv.pdf`, the Coursera certificate. |
| `webdesign`-adjacent built-ins | `/init`, `/update-config`, `/fewer-permission-prompts` for harness housekeeping. |

---

## Standing rules

1. **`/design-fix` never edits before approval.** Findings → questions → approved fixes
   → re-audit. OWNER CALL items are asked, never decided.
2. **Don't start a dev server for a skill.** If one is needed, ask.
3. **Don't run `ultra` or `max` effort reviews** unless explicitly asked — they are the
   costliest and spawn many subagents.
4. **A project `.claude/design-fix.md`, if created, overrides the skill's defaults**,
   and `design.md` decides what counts as intentional. The visible dotted grid rules
   (`design.md` §3) are **intentional**, not a defect — record that in the config so
   each audit does not re-report them.
