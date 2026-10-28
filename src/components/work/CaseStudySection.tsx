import type { ReactNode } from "react";
import type { CaseStudySectionId } from "@/data";

export interface CaseStudySectionProps {
  /** Must match the id in `caseStudySections` — the scroll-spy targets it. */
  id: CaseStudySectionId;
  label: string;
  /**
   * `split` (default): label in a left column, content in a right column that
   * stops short of the full width. `stacked`: label above, content running
   * from the content edge, which is how the reference sets the Overview and
   * nothing else (cs-800).
   */
  layout?: "split" | "stacked";
  children: ReactNode;
}

/**
 * The section shell (reference teardown §6.4, audit E2 and cs-5600).
 *
 * Measured on the reference at 1440: the label sits at the content edge
 * (x=316), the prose starts at x=715 and runs about 640px. Of the 1108px
 * content column that is a 36/64 split, which `9fr 16fr` reproduces without a
 * gap, and the 640px cap on the prose column keeps the right-hand gutter the
 * reference leaves empty. That gutter is load-bearing, not leftover space.
 *
 * The label is the body face, 16px, sentence case, ink (`.u-section-label`).
 *
 * `scroll-mt` clears the mobile progress bar when a rail link jumps to a section.
 */
export function CaseStudySection({
  id,
  label,
  layout = "split",
  children,
}: CaseStudySectionProps) {
  const split = layout === "split";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={`scroll-mt-20 border-t border-border py-14 lg:py-20 ${
        split ? "lg:grid lg:grid-cols-[9fr_16fr]" : ""
      }`}
    >
      <h2 id={`${id}-label`} className="u-section-label">
        {label}
      </h2>
      <div
        className={`min-w-0 ${split ? "mt-6 lg:mt-0 lg:max-w-[640px]" : "mt-6"}`}
      >
        {children}
      </div>
    </section>
  );
}
