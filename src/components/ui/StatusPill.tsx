import { Pulse } from "@/components/motion";
import { site } from "@/lib/site";

export interface StatusPillProps {
  /**
   * Overrides `site.availability.label`. Use it to append a month —
   * `AVAILABLE FOR WORK — NOVEMBER` — which `site.ts` does not model.
   */
  label?: string;
  className?: string;
}

/**
 * Status pill — design.md §7.6.
 *
 * A 6px lime square then uppercase blue body-face text at 14px (audit A1: the
 * reference's pill is SF Pro, not the pixel face). Driven entirely by the one
 * `site.availability.open` flag: when it is false this renders nothing, which is
 * the point. V2 welded "Available for new projects" into an SVG textPath with no
 * way to turn it off.
 *
 * The square breathes (`Pulse`, lessons.md D-017): the one continuous motion
 * in the chrome, and it is off entirely under reduced motion, not slowed.
 */
export function StatusPill({ label, className = "" }: StatusPillProps) {
  if (!site.availability.open) return null;

  return (
    <p className={`inline-flex items-center gap-2 text-accent ${className}`}>
      <Pulse className="shrink-0">
        <span aria-hidden="true" className="size-1.5 bg-accent-2" />
      </Pulse>
      <span className="u-label-sm">{label ?? site.availability.label}</span>
    </p>
  );
}
