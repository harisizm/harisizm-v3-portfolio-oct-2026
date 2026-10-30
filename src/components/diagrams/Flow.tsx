import type { DiagramSpec } from "@/data";

import { Arrow, Frame, Label, Line, STROKE, W } from "./shared";

type FlowSpec = Extract<DiagramSpec, { kind: "flow" }>;

const BOX_H = 84;
const GAP = 30;
const TOP = 16;
const PAD = 10;

/* A five-step flow has 104-unit boxes; the type steps down with the count so
   "Next run continues" still fits in one of them. Widths are estimated at
   0.56em per character, Inter's average at these weights. */
function sizes(n: number): { label: number; note: number } {
  if (n <= 3) return { label: 19, note: 15 };
  if (n === 4) return { label: 16, note: 13 };
  return { label: 14, note: 12 };
}

/** Greedy wrap into at most two lines that fit `width` at `fontSize`. */
function wrap(text: string, width: number, fontSize: number): string[] {
  const budget = Math.floor(width / (fontSize * 0.56));
  if (text.length <= budget) return [text];
  const words = text.split(" ");
  const first: string[] = [];
  while (words.length > 1 && (first.join(" ") + " " + words[0]).trim().length <= budget) {
    first.push(words.shift() as string);
  }
  if (first.length === 0) first.push(words.shift() as string);
  return [first.join(" "), words.join(" ")];
}

/**
 * Steps left to right, an arrow between each. The accent step is the one the
 * drawing is about: orange box, orange label. `excluded` draws a crossed-out
 * dashed box underneath for the thing deliberately not in the flow.
 */
export function Flow({ spec, alt }: { spec: FlowSpec; alt: string }) {
  const n = spec.steps.length;
  const boxW = (W - GAP * (n - 1)) / n;
  const height = spec.excluded ? 216 : BOX_H + TOP * 2;
  const midY = TOP + BOX_H / 2;
  const { label: labelSize, note: noteSize } = sizes(n);
  const labelClass = "font-body font-medium";
  const noteClass = "fill-mid-grey font-body";

  return (
    <Frame height={height} alt={alt}>
      {spec.steps.map((step, i) => {
        const x = i * (boxW + GAP);
        const cx = x + boxW / 2;
        const stroke = step.accent ? STROKE.accent : STROKE.ink;
        const lines = wrap(step.label, boxW - PAD * 2, labelSize);
        const note = step.note ? wrap(step.note, boxW - PAD * 2, noteSize) : [];
        const lineH = labelSize * 1.15;
        const blockH = lines.length * lineH + note.length * noteSize * 1.2;
        let y = midY - blockH / 2 + labelSize * 0.85;
        return (
          <g key={i}>
            <Line
              d={`M${x} ${TOP}H${x + boxW}V${TOP + BOX_H}H${x}Z`}
              stroke={stroke}
              order={i * 2}
            />
            {lines.map((line, li) => {
              const ly = y;
              y += lineH;
              return (
                <Label
                  key={`l${li}`}
                  x={cx}
                  y={ly}
                  className={`${step.accent ? "fill-accent" : "fill-ink"} ${labelClass}`}
                  size={labelSize}
                  order={i * 2 + 1}
                >
                  {line}
                </Label>
              );
            })}
            {note.map((line, ni) => {
              const ny = y + (ni === 0 ? noteSize * 0.1 : 0);
              y += noteSize * 1.2;
              return (
                <Label key={`n${ni}`} x={cx} y={ny} className={noteClass} size={noteSize} order={i * 2 + 1}>
                  {line}
                </Label>
              );
            })}
            {i < n - 1 ? (
              <Arrow
                x1={x + boxW + 4}
                y1={midY}
                x2={x + boxW + GAP - 4}
                y2={midY}
                order={i * 2 + 1}
              />
            ) : null}
          </g>
        );
      })}

      {spec.excluded ? (
        <g>
          <Line
            d={`M${W / 2 - 150} 144H${W / 2 + 150}V200H${W / 2 - 150}Z`}
            stroke={STROKE.faint}
            dashed
            order={n * 2}
          />
          <Line
            d={`M${W / 2 - 150} 144L${W / 2 + 150} 200M${W / 2 + 150} 144L${W / 2 - 150} 200`}
            stroke={STROKE.faint}
            order={n * 2 + 1}
          />
          <Label x={W / 2} y={178} className="fill-mid-grey font-body" size={15} order={n * 2 + 1}>
            {spec.excluded}
          </Label>
        </g>
      ) : null}
    </Frame>
  );
}
