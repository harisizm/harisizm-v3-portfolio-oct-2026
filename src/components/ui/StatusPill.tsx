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
 */
export function StatusPill({ label, className = "" }: StatusPillProps) {
  if (!site.availability.open) return null;

  return (
    <p className={`inline-flex items-center gap-2 text-accent ${className}`}>
      <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent-2" />
      <span className="u-label-sm">{label ?? site.availability.label}</span>
    </p>
  );
}
