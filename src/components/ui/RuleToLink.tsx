import Link from "next/link";
import { resolveHref } from "./link";
import type { ReactNode } from "react";

export interface RuleToLinkProps {
  /**
   * Optional. With no heading the rule starts at the component's left edge —
   * the reference's positioning section is exactly that: a bare rule running
   * from column 2 to `MORE ABOUT US ↗`.
   */
  heading?: ReactNode;
  /** Required — the rule points at something, so there is always a destination. */
  href: string;
  /** The right-hand link text. Rendered uppercase in the body face. */
  label: string;
  /** Heading level. Defaults to `h2`; drop to `h3` inside a section. */
  as?: "h2" | "h3" | "p";
  newTab?: boolean;
  className?: string;
  /** Override the default section-heading size for service rows and the like. */
  headingClassName?: string;
}

/**
 * Rule-to-link — design.md §7.3.
 *
 * Heading left, a 1px rule spanning the empty middle, `LABEL ↗` flush right.
 *
 * On narrow viewports the three parts stack, so the rule becomes a full-width
 * divider between heading and link rather than collapsing to nothing — the row
 * form needs horizontal slack a 48px heading does not leave on a phone.
 */
export function RuleToLink({
  heading,
  href,
  label,
  as: Heading = "h2",
  newTab,
  className = "",
  headingClassName = "text-heading font-medium",
}: RuleToLinkProps) {
  const { internal, targetProps } = resolveHref(href, newTab);

  const linkClass =
    "u-label inline-flex min-h-11 shrink-0 items-center gap-2 text-accent transition-opacity duration-300 ease-[ease] hover:opacity-70";

  const linkBody = (
    <>
      {label}
      <span aria-hidden="true">↗</span>
    </>
  );

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 ${className}`}
    >
      {heading !== undefined && heading !== null ? (
        <Heading className={headingClassName}>{heading}</Heading>
      ) : null}
      <span
        aria-hidden="true"
        className="h-px w-full bg-border sm:w-auto sm:flex-1"
      />
      {internal ? (
        <Link href={href} className={linkClass}>
          {linkBody}
        </Link>
      ) : (
        <a
          href={href}
          className={linkClass}
          {...targetProps}
        >
          {linkBody}
        </a>
      )}
    </div>
  );
}
