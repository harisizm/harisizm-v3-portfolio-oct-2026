export interface GridOverlayProps {
  /**
   * `absolute` fills the nearest positioned ancestor — the default, for sections.
   * `fixed` pins the rules to the viewport, which is what the full-screen menu
   * overlay needs so the grid stays visible through it (design.md §8).
   */
  position?: "absolute" | "fixed";
  /**
   * `behind` is the section motif: the rules sit under the content. It needs a
   * positioned ancestor that does not paint its own background — sections on
   * canvas inherit the body's, so this holds.
   * `front` is for the blue menu overlay, which the rules stay visible through
   * (design.md §8).
   */
  layer?: "behind" | "front";
  className?: string;
}

/**
 * Grid overlay — design.md §3.
 *
 * The dotted column rules. A production visual motif, not a dev tool: they are
 * what makes the whitespace read as deliberate rather than empty.
 *
 * 4 columns ≥1024px, 2 at 640–1023px, 1 below — so 5, 3 and 2 visible lines
 * respectively, both outer edges included. The right-hand edge line is the
 * container's own border rather than a `:last-child` rule, because a span hidden
 * at a breakpoint is still the last child and would keep stealing it.
 */
export function GridOverlay({
  position = "absolute",
  layer = "behind",
  className = "",
}: GridOverlayProps) {
  const rule = "border-l border-dotted border-grid-line";
  /* A named layer rather than a raw z-index in `className`: two Tailwind
     z-utilities on one element resolve by stylesheet order, not author order. */
  const z = layer === "behind" ? "-z-10" : "z-10";

  return (
    <div
      aria-hidden="true"
      className={`${position} ${z} inset-0 px-[var(--gutter)] pointer-events-none ${className}`}
    >
      <div className="grid h-full grid-cols-1 border-r border-dotted border-grid-line sm:grid-cols-2 lg:grid-cols-4">
        <span className={rule} />
        <span className={`${rule} hidden sm:block`} />
        <span className={`${rule} hidden lg:block`} />
        <span className={`${rule} hidden lg:block`} />
      </div>
    </div>
  );
}
