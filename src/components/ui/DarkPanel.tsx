import Link from "next/link";
import { Magnetic, Press } from "@/components/motion";
import { resolveHref } from "./link";
import type { ReactNode } from "react";

export interface DarkPanelProps {
  /**
   * Required. The `↗` in the corner promises a destination, so the panel is a
   * link or it is not a dark panel — lessons.md T-002.
   */
  href: string;
  /** Bottom-left label, body face, uppercase, white. */
  label: string;
  /** Panel body — a question, a heading, a line of copy. Optional. */
  children?: ReactNode;
  /**
   * Quiet sentence-case line under the body — the reference's "We'd love to
   * hear about your brand…" Optional; nothing renders without it.
   */
  subline?: ReactNode;
  newTab?: boolean;
  className?: string;
}

/**
 * Dark panel — design.md §7.5.
 *
 * `--ink` ground, white text, `↗` top-right, label bottom-left. The middle
 * element of the grey → dark → blue escalating trio.
 *
 * The subline is white at 60% rather than `--mid-grey`: `#727272` on `#222`
 * is 3.3:1 and fails AA for 16px text, while rgba(255,255,255,.6) lands at
 * ~7:1 and still reads as the secondary line.
 *
 * The focus ring is the global one: 2px accent at a 3px offset, which lands on
 * the canvas outside the panel rather than on the ink inside it, so blue-on-dark
 * contrast never comes into it.
 *
 * Motion (lessons.md D-017): the panel leans toward a fine pointer and presses
 * on tap. The wrappers are block spans with the caller's `className` on the
 * outer one, so grid placement and margins land where they did before; the
 * anchor fills them (`h-full`) so a panel in a stretched grid cell still
 * matches its neighbour's height. The anchor itself is unchanged.
 */
export function DarkPanel({
  href,
  label,
  children,
  subline,
  newTab,
  className = "",
}: DarkPanelProps) {
  const { internal, targetProps } = resolveHref(href, newTab);

  const shell =
    "group relative flex h-full min-h-[180px] flex-col justify-end bg-ink p-6 text-white transition-opacity duration-300 ease-[ease] hover:opacity-90";

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 text-body leading-none"
      >
        ↗
      </span>
      {children || subline ? (
        <div className="mb-auto max-w-[36ch] pr-10 text-body">
          {children}
          {subline ? (
            <p className="mt-2 text-[16px] leading-[1.4] text-white/60">
              {subline}
            </p>
          ) : null}
        </div>
      ) : null}
      <span className="u-label text-white">{label}</span>
    </>
  );

  const control = internal ? (
    <Link href={href} className={shell}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={shell} {...targetProps}>
      {inner}
    </a>
  );

  /* A panel is a large target, so a small lean (6px) reads as weight, not drift. */
  return (
    <Magnetic className={`block ${className}`} strength={6}>
      <Press className="block h-full" scale={0.985}>
        {control}
      </Press>
    </Magnetic>
  );
}
