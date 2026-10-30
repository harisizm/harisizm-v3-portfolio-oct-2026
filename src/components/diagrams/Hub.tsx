import type { DiagramSpec } from "@/data";

import { Frame, Label, Line, STROKE, TEXT, W } from "./shared";

type HubSpec = Extract<DiagramSpec, { kind: "hub" }>;

const H = 400;
const CX = W / 2;
const CY = H / 2;
const R_CENTRE = 64;
const R_SPOKE = 126;
const LABEL_SIZE = 17;
const LINE_H = 20;

/** Greedy wrap into at most two lines of about `max` characters. */
function wrap(text: string, max: number): string[] {
  if (text.length <= max) return [text];
  const words = text.split(" ");
  const first: string[] = [];
  while (words.length > 1 && [...first, words[0]].join(" ").length <= max) {
    first.push(words.shift() as string);
  }
  if (first.length === 0) first.push(words.shift() as string);
  return [first.join(" "), words.join(" ")];
}

/**
 * One centre, spokes around it: the feature map. Spokes start at the top and
 * go clockwise. A label on the right half anchors at its start, on the left
 * at its end, and straight above or below in the middle, so no label crosses
 * its own line. Labels wrap to two lines rather than running past the frame,
 * and the centre name wraps inside its circle the same way.
 */
export function Hub({ spec, alt }: { spec: HubSpec; alt: string }) {
  const n = spec.spokes.length;
  const centreLines = wrap(spec.centre, 10);

  return (
    <Frame height={H} alt={alt}>
      <Line
        d={`M${CX + R_CENTRE} ${CY}A${R_CENTRE} ${R_CENTRE} 0 1 1 ${CX - R_CENTRE} ${CY}A${R_CENTRE} ${R_CENTRE} 0 1 1 ${CX + R_CENTRE} ${CY}`}
        stroke={STROKE.accent}
        order={0}
      />
      {centreLines.map((line, i) => (
        <Label
          key={line}
          x={CX}
          y={CY + 7 + (i - (centreLines.length - 1) / 2) * LINE_H}
          className={TEXT.labelAccent}
          order={0}
        >
          {line}
        </Label>
      ))}

      {spec.spokes.map((spoke, i) => {
        const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x1 = CX + (R_CENTRE + 6) * cos;
        const y1 = CY + (R_CENTRE + 6) * sin;
        const x2 = CX + R_SPOKE * cos;
        const y2 = CY + R_SPOKE * sin;
        const vertical = Math.abs(cos) < 0.2;
        const anchor = vertical ? "middle" : cos > 0 ? "start" : "end";
        /* Room to the frame edge from the dot, in characters at this size. */
        const room = vertical ? 30 : Math.floor((cos > 0 ? W - x2 - 14 : x2 - 14) / (LABEL_SIZE * 0.56));
        const lines = wrap(spoke, Math.max(10, Math.min(24, room)));
        const lx = x2 + (vertical ? 0 : cos > 0 ? 12 : -12);
        const firstY = vertical
          ? y2 + (sin < 0 ? -12 - (lines.length - 1) * LINE_H : 24)
          : y2 + 6 - ((lines.length - 1) * LINE_H) / 2;
        return (
          <g key={spoke}>
            <Line d={`M${x1} ${y1}L${x2} ${y2}`} stroke={STROKE.faint} order={i + 1} />
            <circle cx={x2} cy={y2} r={3} className="fill-ink" />
            {lines.map((line, li) => (
              <Label
                key={li}
                x={lx}
                y={firstY + li * LINE_H}
                className={TEXT.label}
                size={LABEL_SIZE}
                anchor={anchor}
                order={i + 1}
              >
                {line}
              </Label>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}
