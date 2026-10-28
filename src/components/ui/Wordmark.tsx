import { site } from "@/lib/site";

export type WordmarkVariant = "plain" | "chip" | "chip-text";

export interface WordmarkProps {
  /** `chip` sets the wordmark blue on a lime ground; `chip-text` is the same
      type without the ground, for a parent that paints it; `plain` inherits
      its colour. */
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
 * The chip variant is the header logo: `--accent` text on `--accent-2`, sized up
 * to 28px with 15/30 padding so the box lands on the reference's 193×58 (audit
 * A4). The plain variant keeps the 24px token.
 *
 * Lowercase on purpose: `harisizm` is the one display-face string that is not
 * uppercased.
 */
export function Wordmark({ variant = "plain", className = "" }: WordmarkProps) {
  const skin =
    variant === "chip"
      ? "bg-accent-2 px-[30px] py-[15px] text-[28px] leading-none text-accent"
      : variant === "chip-text"
        ? "text-[28px] leading-none text-accent"
        : "text-wordmark";

  return (
    <span
      className={`inline-block font-display font-bold tracking-[0.6px] ${skin} ${className}`}
    >
      {site.name}
    </span>
  );
}
