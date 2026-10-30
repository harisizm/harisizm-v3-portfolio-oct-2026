import type { DiagramSpec } from "@/data";

import { Frame, Label, Line, STROKE, TEXT, W } from "./shared";

type BeforeAfterSpec = Extract<DiagramSpec, { kind: "before-after" }>;

const H = 176;
const BAR_MAX = W - 150;
const BAR_H = 22;

/**
 * Two bars: the old way in faint ink, the new way in orange, each with its
 * label above and its figure at the end. The lengths are the `share` values
 * from the data, so the drawing is to scale with what the copy claims.
 */
export function BeforeAfter({ spec, alt }: { spec: BeforeAfterSpec; alt: string }) {
  const rows = [
    { ...spec.before, y: 36, stroke: STROKE.faint, text: TEXT.label, accent: false },
    { ...spec.after, y: 118, stroke: STROKE.accent, text: TEXT.labelAccent, accent: true },
  ];

  return (
    <Frame height={H} alt={alt}>
      {rows.map((row, i) => {
        const len = Math.max(12, BAR_MAX * Math.min(1, Math.max(0, row.share)));
        return (
          <g key={row.label}>
            <Label x={0} y={row.y - 12} className={row.text} anchor="start" order={i * 2}>
              {row.label}
            </Label>
            <Line
              d={`M0 ${row.y}H${len}V${row.y + BAR_H}H0Z`}
              stroke={row.stroke}
              order={i * 2 + 1}
            />
            {row.accent ? (
              <rect x={0} y={row.y} width={len} height={BAR_H} className="fill-accent/15" />
            ) : null}
            <Label
              x={len + 14}
              y={row.y + BAR_H / 2 + 7}
              className={row.accent ? TEXT.value : TEXT.note}
              anchor="start"
              order={i * 2 + 1}
            >
              {row.value}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}
