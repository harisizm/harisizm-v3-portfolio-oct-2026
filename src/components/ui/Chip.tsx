import type { ReactNode } from "react";

export type ChipVariant = "solid" | "bracketed";

export interface ChipProps {
  children: ReactNode;
  /**
   * `solid` — white on blue, pixel face, the label that sits above a section
   * heading. `bracketed` — blue on canvas, body face, wrapped in `[ ]`, for
   * page-level labels (`[ WORK ]`, `[ CONTACT ]`).
   */
  variant?: ChipVariant;
  className?: string;
}

/**
 * Section label chip — design.md §7.1.
 *
 * The solid chip is one of only two small pixel-face elements on the site (the
 * other is the menu button); every other small label is the body face. The
 * 8/10/5 padding is asymmetric on purpose — the pixel face sits high in its
 * box, and the reference trims the bottom so the glyphs read centred in a 29px
 * chip.
 *
 * The brackets on the `bracketed` variant are drawn by the component, not typed
 * into the caller's string: it keeps the `[ WORK ]` spacing identical everywhere
 * and keeps the brackets out of the accessible name.
 */
export function Chip({ children, variant = "solid", className = "" }: ChipProps) {
  const skin =
    variant === "solid"
      ? "u-pixel rounded-none bg-accent pb-[5px] pl-[10px] pr-[10px] pt-[8px] text-white"
      : "u-label text-accent";

  return (
    <span className={`inline-block ${skin} ${className}`}>
      {variant === "bracketed" ? <span aria-hidden="true">[&nbsp;</span> : null}
      {children}
      {variant === "bracketed" ? <span aria-hidden="true">&nbsp;]</span> : null}
    </span>
  );
}
