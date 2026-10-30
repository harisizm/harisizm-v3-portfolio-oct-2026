import type { DiagramSpec } from "@/data";

import { Arrow, Frame, Label, Line, STROKE, TEXT, W } from "./shared";

type CoverageSpec = Extract<DiagramSpec, { kind: "coverage" }>;

const H = 250;
const CELL = 46;
const STEP = 40; // cells overlap by 6, like adjacent map searches do

/**
 * One viewport against a grid of them. The single square on the left is what
 * one search sees; the 3 by 3 grid on the right, with its overlaps, is what
 * the tool sweeps. Each carries its measured count.
 */
export function Coverage({ spec, alt }: { spec: CoverageSpec; alt: string }) {
  const singleX = 90;
  const singleY = 50;
  const gridX = W - 90 - (STEP * 2 + CELL);
  const gridY = 40;

  return (
    <Frame height={H} alt={alt}>
      <Line
        d={`M${singleX} ${singleY}H${singleX + 90}V${singleY + 90}H${singleX}Z`}
        stroke={STROKE.ink}
        order={0}
      />
      <Label x={singleX + 45} y={singleY + 118} className={TEXT.label} order={0}>
        {spec.single.label}
      </Label>
      <Label x={singleX + 45} y={singleY + 146} className={TEXT.note} order={1}>
        {spec.single.count}
      </Label>

      <Arrow x1={singleX + 130} y1={singleY + 45} x2={gridX - 40} y2={singleY + 45} order={2} />

      {Array.from({ length: 9 }, (_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = gridX + col * STEP;
        const y = gridY + row * STEP;
        const centre = i === 4;
        return (
          <Line
            key={i}
            d={`M${x} ${y}H${x + CELL}V${y + CELL}H${x}Z`}
            stroke={centre ? STROKE.ink : STROKE.accent}
            order={3 + i}
          />
        );
      })}
      <Label
        x={gridX + STEP + CELL / 2}
        y={gridY + STEP * 2 + CELL + 28}
        className={TEXT.labelAccent}
        order={12}
      >
        {spec.grid.label}
      </Label>
      <Label
        x={gridX + STEP + CELL / 2}
        y={gridY + STEP * 2 + CELL + 58}
        className={TEXT.value}
        order={13}
      >
        {spec.grid.count}
      </Label>
    </Frame>
  );
}
