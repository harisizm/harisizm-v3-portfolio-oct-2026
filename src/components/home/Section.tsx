import type { ReactNode } from "react";

export interface SectionProps {
  /** Anchor target. Every home section has one so in-page links can resolve. */
  id: string;
  children: ReactNode;
  /** Vertical rhythm override — the hero needs a taller shell than the rest. */
  className?: string;
  /** Inner padding override, for the hero's full-viewport stack. */
  innerClassName?: string;
}

/**
 * The shell every home section shares: a positioned, background-free band with
 * the gutter container inside it.
 *
 * The dotted column rules are NOT painted here. One `GridOverlay` is mounted at
 * page level in `app/layout.tsx`, so the rules run unbroken from the header to
 * the footer; per-section overlays left 128px gaps where the lines stopped and
 * restarted (audit A3). The section stays `relative` so the hero can anchor its
 * bottom rail.
 *
 * The container is deliberately full-width with only the 16px gutter — no
 * `max-width`. The page-level overlay spans edge to edge, so a narrower content
 * container would make the rules and the content disagree about how wide the
 * site is, which is exactly the V2 defect in lessons.md T-007.
 */
export function Section({
  id,
  children,
  className = "",
  innerClassName = "py-20 lg:py-32",
}: SectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className={`u-container ${innerClassName}`}>{children}</div>
    </section>
  );
}
