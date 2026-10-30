import type { CSSProperties } from "react";

export type GridOverlayTone = "canvas" | "overlay";

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
   * `front` is for the orange menu overlay, which the rules stay visible through
   * (design.md §8).
   */
  layer?: "behind" | "front";
  /**
   * `canvas` — ink at 12%, the faint neutral line the reference actually
   * renders (audit A3). `overlay` — white at 22%, the lighter blue its rules
   * read as over the menu. Both are mixes of a token, never a raw colour.
   */
  tone?: GridOverlayTone;
  className?: string;
}

/* The reference declares the full-strength blue, but what lands on screen is
   rgb(202,202,202) on the #D9D9D9 canvas — a ~12% ink tint. Match the rendered
   result, not the declared colour. */
const TONE: Record<GridOverlayTone, string> = {
  canvas: "color-mix(in srgb, var(--ink) 12%, transparent)",
  overlay: "color-mix(in srgb, var(--white) 22%, transparent)",
};

/**
 * Grid overlay — design.md §3.
 *
 * The dotted column rules. A production visual motif, not a dev tool: they are
 * what makes the whitespace read as deliberate rather than empty.
 *
 * Mounted ONCE at page level by `app/layout.tsx`, wrapping `main`, so the rules
 * run continuously from under the header to the footer's top rule — the
 * per-section mounts left 128px gaps where the lines stopped and restarted.
 * Sections no longer need their own.
 *
 * 4 columns ≥1024px, 2 at 640–1023px, 1 below — so 5, 3 and 2 visible lines
 * respectively, both outer edges included. The right-hand edge line is the
 * container's own border rather than a `:last-child` rule, because a span hidden
 * at a breakpoint is still the last child and would keep stealing it.
 */
export function GridOverlay({
  position = "absolute",
  layer = "behind",
  tone = "canvas",
  className = "",
}: GridOverlayProps) {
  const rule = "border-l border-dotted border-(--rule)";
  /* A named layer rather than a raw z-index in `className`: two Tailwind
     z-utilities on one element resolve by stylesheet order, not author order. */
  const z = layer === "behind" ? "-z-10" : "z-10";

  return (
    <div
      aria-hidden="true"
      style={{ "--rule": TONE[tone] } as CSSProperties}
      className={`${position} ${z} inset-0 px-[var(--gutter)] pointer-events-none ${className}`}
    >
      <div className="grid h-full grid-cols-1 border-r border-dotted border-(--rule) sm:grid-cols-2 lg:grid-cols-4">
        <span className={rule} />
        <span className={`${rule} hidden sm:block`} />
        <span className={`${rule} hidden lg:block`} />
        <span className={`${rule} hidden lg:block`} />
      </div>
    </div>
  );
}
