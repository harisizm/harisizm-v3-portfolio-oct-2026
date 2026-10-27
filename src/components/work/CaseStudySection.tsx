import type { ReactNode } from "react";
import type { CaseStudySectionId } from "@/data";

export interface CaseStudySectionProps {
  /** Must match the id in `caseStudySections` — the scroll-spy targets it. */
  id: CaseStudySectionId;
  label: string;
  children: ReactNode;
}

/**
 * The section shell: small label in a left column, content in a right column that
 * stops short of the full width (reference teardown §6.4). The empty gutter is
 * load-bearing, not leftover space.
 *
 * `scroll-mt` clears the mobile progress bar when a rail link jumps to a section.
 */
export function CaseStudySection({ id, label, children }: CaseStudySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className="scroll-mt-20 border-t border-border py-14 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-x-10 lg:py-20"
    >
      <h2 id={`${id}-label`} className="u-label text-mid-grey">
        {label}
      </h2>
      <div className="mt-6 min-w-0 lg:mt-0">{children}</div>
    </section>
  );
}
