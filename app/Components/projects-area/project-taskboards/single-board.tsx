"use client";

import { useDroppable } from "@dnd-kit/core";
import { GiYarn } from "react-icons/gi";
import { Task } from "../../workshop-context";
import SingleTask from "./single-task";

export type Board = {
  id: "queue" | "needle" | "done";
  name: string;
  color: "blue" | "orange" | "purple";
};

// Full class names are listed so Tailwind can detect them.
const HEADER_STYLES: Record<Board["color"], { header: string; badge: string }> = {
  blue: {
    header: "bg-blue-50 text-blue-900 dark:bg-blue-500/15 dark:text-blue-100",
    badge: "bg-blue-500 text-white",
  },
  orange: {
    header: "bg-orange-50 text-orange-900 dark:bg-orange-500/15 dark:text-orange-100",
    badge: "bg-orange-500 text-white",
  },
  purple: {
    header: "bg-purple-50 text-purple-900 dark:bg-purple-500/15 dark:text-purple-100",
    badge: "bg-purple-500 text-white",
  },
};

export default function SingleBoard({ board, tasks }: { board: Board; tasks: Task[] }) {
  const styles = HEADER_STYLES[board.color];
  const { setNodeRef, isOver } = useDroppable({ id: board.id });

  return (
    <section
      ref={setNodeRef}
      className={`flex min-h-80 flex-col gap-4 rounded-3xl p-2 transition-colors ${
        isOver ? "bg-primary/5 ring-2 ring-primary/30 ring-dashed" : ""
      }`}
    >
      <div className={`flex items-center justify-between rounded-2xl px-4 py-3 ${styles.header}`}>
        <h2 className="text-sm font-semibold">{board.name}</h2>
        <span className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold ${styles.badge}`}>
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}

        {tasks.length === 0 && board.id === "done" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center text-muted-foreground">
            <GiYarn className="size-12 text-purple-300 dark:text-purple-400/60" />
            <p className="text-sm">No orders completed today!</p>
          </div>
        )}
        {tasks.length === 0 && board.id !== "done" && (
          <p className="py-10 text-center text-sm text-muted-foreground">No tasks here yet</p>
        )}
      </div>
    </section>
  );
}
