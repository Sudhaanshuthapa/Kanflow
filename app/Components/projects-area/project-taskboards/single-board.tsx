"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TasksDropDown from "../../drop-downs/tasks-drop-down";
import { Task, TaskTag } from "../../workshop-context";

const TAG_STYLES: Record<TaskTag, string> = {
  Custom: "bg-yellow-100 text-yellow-800 dark:bg-yellow-400/15 dark:text-yellow-300",
  Repair: "bg-blue-100 text-blue-800 dark:bg-blue-400/15 dark:text-blue-300",
  Urgent: "bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-300",
  Standard: "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300",
};

/** Presentational card, also used inside the DragOverlay. */
export function TaskCard({ task, className, ...props }: { task: Task } & React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("gap-2 border-2 border-dashed bg-card py-3 shadow-none", className)} {...props}>
      <CardHeader className="px-4">
        <div className="flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${TAG_STYLES[task.tag]}`}>
            # {task.tag}
          </span>
          {/* keep the menu usable: don't let it start a drag */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <TasksDropDown task={task} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        <span className="text-base font-semibold">{task.title}</span>
        <span className="text-sm text-muted-foreground">{task.description}</span>
      </CardContent>
    </Card>
  );
}

export default function SingleTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id });

  return (
    <TaskCard
      ref={setNodeRef}
      task={task}
      className={cn("cursor-grab touch-manipulation active:cursor-grabbing", isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    />
  );
}
