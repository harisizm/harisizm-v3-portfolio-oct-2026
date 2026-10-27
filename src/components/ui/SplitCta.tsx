import Link from "next/link";
import { resolveHref } from "./link";

export interface SplitCtaProps {
  /**
   * Required, and deliberately so. V2's primary CTA shipped with no handler and
   * no destination at all — see lessons.md T-002. This component cannot be
   * rendered without somewhere to go.
   */
  href: string;
  label: string;
  /** Override the auto-detected new-tab behaviour for absolute URLs. */
  newTab?: boolean;
  /** Use when `label` alone is not a sufficient accessible name. */
  ariaLabel?: string;
  className?: string;
}

/**
 * Split CTA — design.md §7.2.
 *
 * Two visual controls, one action: a filled blue button and a square outlined
 * `↗`. They live inside a single anchor, so there is exactly one tab stop, one
 * hover target and one destination — "two controls, one action" enforced by the
 * markup rather than by convention.
 */
export function SplitCta({
  href,
  label,
  newTab,
  ariaLabel,
  className = "",
}: SplitCtaProps) {
  const { internal, targetProps } = resolveHref(href, newTab);

  const shell = `group inline-flex items-stretch gap-2 ${className}`;
  const filled =
    "u-label flex min-h-11 items-center bg-accent px-6 text-white transition-opacity duration-300 ease-[ease] group-hover:opacity-80";
  const square =
    "flex size-11 shrink-0 items-center justify-center border border-accent text-accent transition-opacity duration-300 ease-[ease] group-hover:opacity-80";

  const inner = (
    <>
      <span className={filled}>{label}</span>
      <span aria-hidden="true" className={square}>
        ↗
      </span>
    </>
  );

  if (internal) {
    return (
      <Link href={href} aria-label={ariaLabel} className={shell}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={shell}
      {...targetProps}
    >
      {inner}
    </a>
  );
}
