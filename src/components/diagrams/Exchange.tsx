import type { DiagramSpec } from "@/data";

import { Arrow, Frame, Label, Line, STROKE, TEXT, W } from "./shared";

type ExchangeSpec = Extract<DiagramSpec, { kind: "exchange" }>;

const LEFT = 120;
const RIGHT = W - 120;
const TOP = 28;
const ROW = 58;

/**
 * Two parties passing offers across the gap, top to bottom, with a dashed
 * floor underneath that none of them can go below. The accent round is the
 * one that closes the deal.
 */
export function Exchange({ spec, alt }: { spec: ExchangeSpec; alt: string }) {
  const n = spec.rounds.length;
  const floorY = TOP + 50 + n * ROW + 14;
  const H = floorY + 40;

  return (
    <Frame height={H} alt={alt}>
      <Label x={LEFT} y={TOP} className={TEXT.party} order={0}>
        {spec.left}
      </Label>
      <Label x={RIGHT} y={TOP} className={TEXT.party} order={0}>
        {spec.right}
      </Label>
      <Line d={`M${LEFT} ${TOP + 14}V${floorY - 10}`} stroke={STROKE.faint} order={0} />
      <Line d={`M${RIGHT} ${TOP + 14}V${floorY - 10}`} stroke={STROKE.faint} order={0} />

      {spec.rounds.map((round, i) => {
        const y = TOP + 50 + i * ROW;
        const fromLeft = round.from === "left";
        const stroke = round.accent ? STROKE.accent : STROKE.ink;
        return (
          <g key={i}>
            <Label
              x={W / 2}
              y={y - 10}
              className={round.accent ? TEXT.labelAccent : TEXT.label}
              order={i + 1}
            >
              {round.label}
            </Label>
            <Arrow
              x1={fromLeft ? LEFT + 10 : RIGHT - 10}
              y1={y}
              x2={fromLeft ? RIGHT - 10 : LEFT + 10}
              y2={y}
              stroke={stroke}
              order={i + 1}
            />
          </g>
        );
      })}

      <Line d={`M0 ${floorY}H${W}`} stroke={STROKE.accent} dashed order={n + 1} />
      <Label x={W / 2} y={floorY + 26} className={TEXT.note} order={n + 1}>
        {spec.floor}
      </Label>
    </Frame>
  );
}
