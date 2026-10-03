"use client";

import { useWorkshop } from "../workshop-context";

const SIZE = 180;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 6; // visible gap between segments (px of arc length)

export default function CircularProgress() {
  const { stats } = useWorkshop();
  const { percent, total } = stats;

  const segments = [
    { key: "done", value: percent.done, color: "#8b7cf6" }, // purple
    { key: "needle", value: percent.needle, color: "#fb923c" }, // orange
    { key: "queue", value: percent.queue, color: "#60a5fa" }, // blue
  ];

  let offset = 0;
  const arcs = segments.map((seg) => {
    const length = (seg.value / 100) * CIRCUMFERENCE;
    // round caps stick out by STROKE/2 on each end, so shorten the dash to keep a clean gap
    const dash = Math.max(length - GAP - STROKE, 0);
    const arc = { ...seg, dash, start: offset + GAP / 2 + STROKE / 2, visible: seg.value > 0 };
    offset += length;
    return arc;
  });

  return (
    <div className="flex justify-center">
      <div
        className="relative"
        style={{ width: SIZE, height: SIZE }}
        role="img"
        aria-label={`${Math.round(percent.done)}% of tasks completed`}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          {/* empty track, visible when the project has no tasks */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-muted"
          />
          {arcs.map((arc) => (
            <circle
              key={arc.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={arc.color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${arc.dash} ${CIRCUMFERENCE - arc.dash}`}
              strokeDashoffset={-arc.start}
              opacity={arc.visible ? 1 : 0}
              style={{ transition: "stroke-dasharray 500ms ease, stroke-dashoffset 500ms ease, opacity 300ms" }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{total === 0 ? 0 : Math.round(percent.done)}%</span>
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">COMPLETE</span>
        </div>
      </div>
    </div>
  );
}
