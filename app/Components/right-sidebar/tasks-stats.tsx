"use client";

import { useWorkshop } from "../workshop-context";

export default function TasksStats() {
  const { stats } = useWorkshop();

  const items = [
    { label: "TOTAL", value: stats.total, accent: "bg-purple-500" },
    { label: "IN PROGRESS", value: stats.inProgress, accent: "bg-orange-400" },
    { label: "DUE THIS WEEK", value: stats.dueThisWeek, accent: "bg-blue-400" },
    { label: "COMPLETED", value: stats.completed, accent: "bg-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2 rounded-2xl bg-muted px-4 py-3">
          <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">{item.label}</span>
          <div className="flex items-center gap-2">
            <span className={`h-6 w-1 rounded-full ${item.accent}`} />
            <span className="text-2xl font-bold">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
