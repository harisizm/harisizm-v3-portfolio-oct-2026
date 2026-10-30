import type { CSSProperties } from "react";

import type { IconName } from "@/data";

/**
 * The line-icon set (lessons.md D-020). One hand throughout: a 24-unit grid,
 * 1.5 stroke, round caps and joins, `currentColor`, so an icon takes the
 * colour of the text beside it. A few are wider than square because they
 * draw a change rather than a thing: the clock that becomes a smaller clock,
 * the three bots.
 *
 * The names are the data layer's `IconName`; this map has to cover every one
 * of them, and the type guarantees it does.
 */
interface IconDef {
  /** viewBox width; height is always 24. */
  readonly w?: number;
  readonly d: string;
  /** Filled dots and the like, drawn without a stroke. */
  readonly fill?: string;
}

const BOT =
  "M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM12 9V6M9.5 16.5h5";
const BOT_FILL = "M12 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 13a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 9 13zm6 0a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 15 13z";

function shift(d: string, dx: number): string {
  return d.replace(/([MLHV])(-?[\d.]+)/g, (m, cmd: string, n: string) =>
    cmd === "V" ? m : `${cmd}${Number(n) + dx}`,
  );
}

export const ICONS: Record<IconName, IconDef> = {
  clock: { d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2" },
  "clock-reduce": {
    w: 60,
    d: "M10 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM10 7v5l3 2M25 12h10M32 9l3 3-3 3M50 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM47.5 12l2 2 3.5-3.5",
  },
  users: {
    d: "M16 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM21 20v-2a4 4 0 0 0-3-3.9M15.5 3.6a3.5 3.5 0 0 1 0 6.8",
  },
  bot: { d: BOT, fill: BOT_FILL },
  bots: {
    w: 72,
    d: `${BOT}${shift(BOT, 24)}${shift(BOT, 48)}`,
    fill: `${BOT_FILL}${shift(BOT_FILL, 24)}${shift(BOT_FILL, 48)}`,
  },
  calendar: { d: "M3 6h18v15H3zM3 10h18M8 3v4M16 3v4M9 15.5l2 2 4-4" },
  globe: { d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" },
  "map-pin": { d: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" },
  store: { d: "M3 9l1.5-5h15L21 9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v9h14v-9M10 21v-5h4v5" },
  chart: { d: "M4 20v-9M10 20V5M16 20v-6M22 20H2" },
  file: { d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6" },
  shield: { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4" },
  bolt: { d: "M13 2L4 14h7l-1 8 9-12h-7z" },
  check: { d: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM8 12l3 3 5-6" },
  "hand-off": {
    d: "M7 12V6a1.5 1.5 0 0 1 3 0v5M10 10V4.5a1.5 1.5 0 0 1 3 0V11M13 10.5V6a1.5 1.5 0 0 1 3 0v6M16 11.5v-2a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7l-2.5-4.3a1.5 1.5 0 0 1 2.5-1.7L7 14M3 21L21 3",
  },
  mail: { d: "M3 6h18v13H3zM3 8l9 6 9-6" },
  sheet: { d: "M3 4h18v16H3zM3 9h18M3 14h18M9 4v16M15 4v16" },
  mic: { d: "M9 6a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0zM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" },
  tag: { d: "M20 12l-8 8-9-9V4h7l10 8z", fill: "M8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" },
  layers: { d: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5" },
  gauge: { d: "M3 18a9 9 0 0 1 18 0M12 18l4.5-6M6.5 11.5l1.2 1.2M17.5 11.5l-1.2 1.2M12 9v1.6", fill: "M12 16.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" },
  refresh: { d: "M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" },
  grid: { d: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  briefcase: { d: "M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" },
  lock: { d: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4", fill: "M12 15a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" },
  bell: { d: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" },
  graduation: { d: "M2 9l10-5 10 5-10 5zM6 11v4c0 2 3 4 6 4s6-2 6-4v-4M22 9v6" },
  hash: { d: "M5 9h14M5 15h14M10 3l-2 18M16 3l-2 18" },
  rocket: { d: "M12 2c3 3 4 7 4 11l-4 4-4-4c0-4 1-8 4-11zM8 13l-3 2v3l3-1M16 13l3 2v3l-3-1M12 22v-3", fill: "M12 7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" },
  speak: { d: "M4 10h3l5-4v12l-5-4H4zM15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" },
  code: { d: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" },
  layout: { d: "M3 4h18v16H3zM3 9h18M9 9v11" },
  server: { d: "M3 4h18v7H3zM3 13h18v7H3z", fill: "M6.5 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" },
  database: { d: "M12 3c5 0 8 1.3 8 3s-3 3-8 3-8-1.3-8-3 3-3 8-3zM4 6v12c0 1.7 3 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3 3 8 3s8-1.3 8-3" },
  wrench: { d: "M14.5 3.5a5 5 0 0 0-5.9 6.6L3 15.7V21h5.3l5.6-5.6a5 5 0 0 0 6.6-5.9l-3 3-3.5-1-1-3.5z" },
  sparkle: { d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" },
  /* The stack names without a published mark (D-021). */
  api: { d: "M8 5c-2 0-3 1-3 3v2c0 1-1 2-2 2 1 0 2 1 2 2v2c0 2 1 3 3 3M16 5c2 0 3 1 3 3v2c0 1 1 2 2 2-1 0-2 1-2 2v2c0 2-1 3-3 3M10 12h4" },
  async: { d: "M3 7h12M12 4l3 3-3 3M21 17H9M12 14l-3 3 3 3M3 12h5M16 12h5" },
  stream: { d: "M3 7h10M3 12h18M3 17h14M16 5l2 2-2 2M20 15l2 2-2 2" },
  anchor: { d: "M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 7v14M5 13H3a9 9 0 0 0 18 0h-2M8 10h8" },
  pipeline: { d: "M3 12h4l2-3 2 6 2-6 2 3h6M3 6h3M3 18h3" },
  switch: { d: "M4 7h7l3 5-3 5H4M11 7l3 5-3 5M20 7h-3M20 17h-3M14 12h6" },
  funnel: { d: "M3 5h18l-7 8v6l-4 2v-8z" },
  vector: { d: "M4 20L20 4M4 20h8M4 20v-8M20 4h-6M20 4v6", fill: "M4 18.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM20 2.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" },
  mask: { d: "M4 5c3 1 5 1 8 0 3 1 5 1 8 0v7c0 5-4 8-8 9-4-1-8-4-8-9zM8 11h2M14 11h2M9 15c2 1 4 1 6 0" },
  route: { d: "M4 18a3 3 0 1 0 0-.01M20 6a3 3 0 1 0 0-.01M6 16c2-6 10-4 12-8" },
  state: { d: "M4 4h16v16H4zM4 12h16M12 12v8M8 8h.01M16 8h.01" },
};

export interface IconProps {
  name: IconName;
  /** Height in em of the surrounding text, so the icon sizes with the type. */
  size?: number;
  className?: string;
}

/**
 * One icon from the set, decorative by default: the text beside it carries
 * the meaning, so the drawing is hidden from assistive tech. Height follows
 * the surrounding font size; width follows the icon's own proportion.
 */
export function Icon({ name, size = 1, className = "" }: IconProps) {
  const icon = ICONS[name];
  const w = icon.w ?? 24;
  const style: CSSProperties = { height: `${size}em`, width: `${(size * w) / 24}em` };

  return (
    <svg
      viewBox={`0 0 ${w} 24`}
      aria-hidden="true"
      focusable="false"
      style={style}
      className={`inline-block shrink-0 fill-none stroke-current ${className}`}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icon.d} />
      {icon.fill ? <path d={icon.fill} className="fill-current stroke-none" /> : null}
    </svg>
  );
}
