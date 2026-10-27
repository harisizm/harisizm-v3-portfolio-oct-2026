import Link from "next/link";
import { resolveHref } from "./link";
import type { ReactNode } from "react";

export interface DarkPanelProps {
  /**
   * Required. The `↗` in the corner promises a destination, so the panel is a
   * link or it is not a dark panel — lessons.md T-002.
   */
  href: string;
  /** Bottom-left label, display face, uppercase. */
  label: string;
  /** Panel body — a question, a heading, a line of copy. Optional. */
  children?: ReactNode;
  newTab?: boolean;
  className?: string;
}

/**
 * Dark panel — design.md §7.5.
 *
 * `--ink` ground, white text, `↗` top-right, label bottom-left. The middle
 * element of the grey → dark → blue escalating trio.
 *
 * The focus ring is the global one: 2px accent at a 3px offset, which lands on
 * the canvas outside the panel rather than on the ink inside it, so blue-on-dark
 * contrast never comes into it.
 */
export function DarkPanel({
  href,
  label,
  children,
  newTab,
  className = "",
}: DarkPanelProps) {
  const { internal, targetProps } = resolveHref(href, newTab);

  const shell = `group relative flex min-h-[180px] flex-col justify-end bg-ink p-6 text-white transition-opacity duration-300 ease-[ease] hover:opacity-90 ${className}`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 font-display text-[20px] leading-none"
      >
        ↗
      </span>
      {children ? <div className="mb-auto max-w-[36ch] pr-10">{children}</div> : null}
      <span className="u-label">{label}</span>
    </>
  );

  if (internal) {
    return (
      <Link href={href} className={shell}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={shell}
      {...targetProps}
    >
      {inner}
    </a>
  );
}
