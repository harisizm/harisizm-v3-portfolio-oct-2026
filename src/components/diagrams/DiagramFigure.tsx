"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

import type { DiagramSpec } from "@/data";

import { BeforeAfter } from "./BeforeAfter";
import { Coverage } from "./Coverage";
import { Exchange } from "./Exchange";
import { Flow } from "./Flow";
import { Hub } from "./Hub";

export interface DiagramFigureProps {
  spec: DiagramSpec;
  /** The one line under the drawing. */
  caption: string;
  /** What a screen reader hears instead of the drawing. */
  alt: string;
  className?: string;
}

/**
 * A case-study drawing, from data (lessons.md D-019).
 *
 * The drawings are inline SVG in the site's own tokens, so they recolour with
 * the palette and never go stale as rasters would. Each kind is a small
 * component below; this wrapper picks the kind, frames it and handles the
 * draw-on.
 *
 * Draw-on: every connector carries `data-stroke` and `pathLength="1"`, and
 * every label `data-fade`. The CSS in globals.css starts them hidden only
 * once JavaScript has stamped `data-js` on the root, so the figure is
 * complete with JS off, and `data-drawn` lands when the figure scrolls into
 * view to let the strokes draw and the labels fade up. Reduced motion
 * collapses both transitions through the global rule.
 */
export function DiagramFigure({ spec, caption, alt, className = "" }: DiagramFigureProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <figure ref={ref} className={`diagram ${className}`} data-drawn={inView ? "" : undefined}>
      <div className="border border-border bg-surface-alt px-4 py-6 sm:px-8">
        <Drawing spec={spec} alt={alt} />
      </div>
      <figcaption className="mt-3 max-w-[52ch] text-label text-mid-grey">{caption}</figcaption>
    </figure>
  );
}

function Drawing({ spec, alt }: { spec: DiagramSpec; alt: string }): ReactNode {
  switch (spec.kind) {
    case "flow":
      return <Flow spec={spec} alt={alt} />;
    case "hub":
      return <Hub spec={spec} alt={alt} />;
    case "before-after":
      return <BeforeAfter spec={spec} alt={alt} />;
    case "exchange":
      return <Exchange spec={spec} alt={alt} />;
    case "coverage":
      return <Coverage spec={spec} alt={alt} />;
  }
}
