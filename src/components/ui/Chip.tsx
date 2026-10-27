import type { ReactNode } from "react";

export type ChipVariant = "solid" | "bracketed";

export interface ChipProps {
  children: ReactNode;
  /**
   * `solid` — white on blue, the label that sits above a section heading.
   * `bracketed` — blue on canvas, wrapped in `[ ]`, for page-level labels
   * (`[ WORK ]`, `[ CONTACT ]`).
   */
  variant?: ChipVariant;
  className?: string;
}

/**
 * Section label chip — design.md §7.1.
 *
 * The brackets on the `bracketed` variant are drawn by the component, not typed
 * into the caller's string: it keeps the `[ WORK ]` spacing identical everywhere
 * and keeps the brackets out of the accessible name.
 */
export function Chip({ children, variant = "solid", className = "" }: ChipProps) {
  const skin =
    variant === "solid"
      ? "bg-accent px-2 py-1 text-white"
      : "text-accent";

  return (
    <span className={`u-label inline-block ${skin} ${className}`}>
      {variant === "bracketed" ? <span aria-hidden="true">[&nbsp;</span> : null}
      {children}
      {variant === "bracketed" ? <span aria-hidden="true">&nbsp;]</span> : null}
    </span>
  );
}
