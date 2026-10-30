import type { ReactNode } from "react";

/**
 * The drawing vocabulary every diagram kind shares: one frame, one arrow, one
 * set of text styles. Keeping these here is what makes five kinds read as one
 * hand.
 *
 * Sizes are in user units inside a 640-wide viewBox. The figure scales to its
 * column, so at phone width everything is about 0.55 of these values; the
 * text sizes are chosen so the smallest still reads there.
 */

export const W = 640;

/** Text styles. Body face throughout; the display face would fight the labels. */
export const TEXT = {
  label: "fill-ink font-body text-[19px] font-medium",
  labelAccent: "fill-accent font-body text-[19px] font-medium",
  note: "fill-mid-grey font-body text-[15px]",
  value: "fill-accent font-display text-[22px] font-bold",
  party: "fill-ink font-body text-[17px] font-medium uppercase tracking-[0.2px]",
} as const;

export const STROKE = {
  ink: "stroke-ink",
  faint: "stroke-ink/35",
  accent: "stroke-accent",
} as const;

export function Frame({
  height,
  alt,
  children,
}: {
  height: number;
  alt: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      role="img"
      aria-label={alt}
      className="h-auto w-full fill-none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/**
 * A straight connector with a chevron head, drawn in the given stroke class.
 * The head is part of the same path so one `data-stroke` draws line and head
 * together; `pathLength="1"` is what lets the CSS draw it from a dash of 1.
 */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke = STROKE.ink,
  order = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  /** Draw order, for the stagger. */
  order?: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 9;
  const left = `${x2 - head * Math.cos(angle - Math.PI / 6)} ${y2 - head * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - head * Math.cos(angle + Math.PI / 6)} ${y2 - head * Math.sin(angle + Math.PI / 6)}`;
  return (
    <path
      d={`M${x1} ${y1}L${x2} ${y2}M${left}L${x2} ${y2}L${right}`}
      pathLength={1}
      data-stroke=""
      className={stroke}
      style={{ "--i": order } as React.CSSProperties}
    />
  );
}

/** A line with no head, same draw-on treatment. */
export function Line({
  d,
  stroke = STROKE.ink,
  order = 0,
  dashed = false,
}: {
  d: string;
  stroke?: string;
  order?: number;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      data-stroke=""
      className={stroke}
      strokeDasharray={dashed ? "0.02 0.015" : undefined}
      style={{ "--i": order } as React.CSSProperties}
    />
  );
}

/** A label that fades up with the stagger. */
export function Label({
  x,
  y,
  className,
  anchor = "middle",
  order = 0,
  size,
  children,
}: {
  x: number;
  y: number;
  className: string;
  anchor?: "start" | "middle" | "end";
  order?: number;
  /** Font size in user units, for the kinds that step type down by count.
      Inline, because Tailwind cannot see a class built from a number. */
  size?: number;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={className}
      data-fade=""
      style={{ "--i": order, ...(size ? { fontSize: size } : {}) } as React.CSSProperties}
    >
      {children}
    </text>
  );
}
