import { site } from "@/lib/site";

export type WordmarkVariant = "plain" | "chip";

export interface WordmarkProps {
  /** `chip` sets the wordmark on a lime ground; `plain` inherits its colour. */
  variant?: WordmarkVariant;
  className?: string;
}

/**
 * Wordmark — design.md §4, 24px/700/+0.6px in the display face.
 *
 * Presentational only. The header and footer wrap it in their own `Link`, so the
 * wordmark never carries a destination of its own and cannot become a dead
 * control. Override the size via `className` for the giant footer treatment.
 *
 * Lowercase on purpose: `harisizm` is the one display-face string that is not
 * uppercased.
 */
export function Wordmark({ variant = "plain", className = "" }: WordmarkProps) {
  const skin = variant === "chip" ? "bg-accent-2 px-2 py-1 text-ink" : "";

  return (
    <span
      className={`inline-block font-display text-wordmark font-bold tracking-[0.6px] ${skin} ${className}`}
    >
      {site.name}
    </span>
  );
}
