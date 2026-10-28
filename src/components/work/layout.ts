/**
 * Rail geometry shared by `/work` and `/work/[slug]` (audit E5).
 *
 * The reference's rail is narrower than a grid column: its divider sits at
 * x=292 and content begins at x=316 on a 1440 viewport. `--rail` is that 292,
 * measured from the viewport edge, so the column itself is `--rail` minus the
 * gutter the container already spends, and the 24px gap lands the content
 * column exactly on 316. The divider is a border on the rail cell, not a grid
 * overlay rule, because it is a solid line the overlay's dotted rules are not.
 */
export const RAIL_GRID =
  "u-container lg:grid lg:grid-cols-[calc(var(--rail)-var(--gutter))_minmax(0,1fr)] lg:gap-x-6";

/**
 * The rail's grid cell. It stretches to the full row height (no `items-start`
 * on the grid) so the sticky block inside it has the whole scroll to stick
 * through, and so the divider runs unbroken to where the next section's top
 * rule takes over.
 */
export const RAIL_CELL = "lg:border-r lg:border-border";
