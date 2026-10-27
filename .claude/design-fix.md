# design-fix overrides for this project

`design.md` decides what counts as intentional. These are the things an audit will
otherwise report every run.

## Intentional — do not report

- **Visible dotted column rules.** The 1px dotted `--grid-line` (#2467EC) rules on
  every column boundary are a production design motif (`design.md` §3), not a
  leftover dev grid. Five rules at desktop, including both outer edges.
- **The warm-grey canvas.** `#D9D9D9`, not white. There is no dark mode in v1 and
  its absence is not a defect (`design.md` §2).
- **Custom pixel cursors.** 32×32 stepped-edge SVGs are deliberately lo-fi
  (`design.md` §5). Aliasing is the point.
- **Generous empty columns.** Case-study and work-index sections deliberately leave
  whole columns empty; the text column stops well short of full width. That is the
  composition, not a layout bug.
- **Mixed weights inside one headline.** The hero sets a single sentence at one size
  in weights 600 and 300 (`design.md` §4). Not an inconsistency.
- **Uppercase display-face text with wide tracking** on labels, nav and numbers.

## Always report — these are the project's own failure modes

Treat these as high severity; each one is a defect V2 actually shipped
(`lessons.md`).

- **Any interactive element with no destination or no handler.** T-002. A control
  that renders but does nothing is the worst defect this project can have.
- **Any colour outside the token set** in `src/app/globals.css`. The two-accent
  discipline is the whole design system.
- **`--dim` (#8C8C8C) used for text that must be read** — it is ~2.2:1 on the canvas
  and fails WCAG AA. `--mid-grey` (#727272) is the readable secondary.
- **Animation with no `prefers-reduced-motion` path.** T-009.
- **Touch targets under 44×44px.** T-007.
- **Horizontal overflow at 390px.** T-007.
- **Content invisible with JS disabled** — reveal animations must resolve to their
  final state.

## Notes

- Never start a dev server for an audit. Ask first.
- Present findings and proposed fixes as questions, wait for approval, fix only what
  was approved, then re-audit to prove it gone.
