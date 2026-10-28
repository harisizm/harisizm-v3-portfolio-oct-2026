import Link from "next/link";
import { Magnetic, Press } from "@/components/motion";
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
 *
 * Label is the body face at 18px uppercase (audit A1), not the pixel face. The
 * reference button measures 220×42 for "LET'S BUILD YOURS"; 42px tall with 24px
 * side padding lands a label of that length at about that width.
 *
 * Motion (lessons.md D-017): the anchor leans toward a fine pointer and
 * presses on tap. Both wrappers are inert spans around an unchanged anchor, so
 * the click, the focus ring and the single tab stop are the anchor's own. The
 * caller's `className` goes on the outer wrapper, which is the box that sits in
 * the caller's layout.
 */
export function SplitCta({
  href,
  label,
  newTab,
  ariaLabel,
  className = "",
}: SplitCtaProps) {
  const { internal, targetProps } = resolveHref(href, newTab);

  const shell = "group inline-flex items-stretch gap-2";
  const filled =
    "u-label-lg flex min-h-[42px] items-center bg-accent px-6 text-white transition-opacity duration-300 ease-[ease] group-hover:opacity-80";
  const square =
    "flex size-[42px] shrink-0 items-center justify-center border border-accent text-accent transition-opacity duration-300 ease-[ease] group-hover:opacity-80";

  const inner = (
    <>
      <span className={filled}>{label}</span>
      <span aria-hidden="true" className={square}>
        ↗
      </span>
    </>
  );

  const control = internal ? (
    <Link href={href} aria-label={ariaLabel} className={shell}>
      {inner}
    </Link>
  ) : (
    <a href={href} aria-label={ariaLabel} className={shell} {...targetProps}>
      {inner}
    </a>
  );

  return (
    <Magnetic className={`inline-block ${className}`}>
      <Press>{control}</Press>
    </Magnetic>
  );
}
