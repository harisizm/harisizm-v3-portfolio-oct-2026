import type { ReactNode } from "react";

import { GridOverlay } from "@/components/ui";

export interface SectionProps {
  /** Anchor target. Every home section has one so in-page links can resolve. */
  id: string;
  children: ReactNode;
  /** Vertical rhythm override — the hero needs a taller shell than the rest. */
  className?: string;
  /** Inner padding override, for the hero's bottom-anchored stack. */
  innerClassName?: string;
}

/**
 * The shell every home section shares: a positioned, background-free band with
 * the dotted column rules behind it (design.md §3) and the gutter container in
 * front.
 *
 * The container is deliberately full-width with only the 16px gutter — no
 * `max-width`. The grid overlay spans the section edge to edge, so a narrower
 * content container would make the rules and the content disagree about how wide
 * the site is, which is exactly the V2 defect in lessons.md T-007.
 */
export function Section({
  id,
  children,
  className = "",
  innerClassName = "py-20 lg:py-32",
}: SectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      <GridOverlay />
      <div className={`u-container ${innerClassName}`}>{children}</div>
    </section>
  );
}
