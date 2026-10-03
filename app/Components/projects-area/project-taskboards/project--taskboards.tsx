"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { TaskStatus, useWorkshop } from "../../workshop-context";
import SingleBoard, { Board } from "./single-board";
import { TaskCard } from "./single-task";

const boards: Board[] = [
  { id: "queue", name: "In Queue", color: "blue" },
  { id: "needle", name: "On the Needle", color: "orange" },
  { id: "done", name: "Completed", color: "purple" },
];

export default function ProjectsAreaTaskBoards() {
  const { tasks, activeProject, sortOrder, moveTask } = useWorkshop();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // small activation distance / delay so clicks and scrolling still work
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const projectTasks = tasks
    .filter((t) => t.projectId === activeProject.id)
    .sort((a, b) => a.title.localeCompare(b.title) * (sortOrder === "A-Z" ? 1 : -1));

  const activeTask = tasks.find((t) => t.id === activeId) ?? null;

  const handleDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));
  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    if (e.over) moveTask(String(e.active.id), e.over.id as TaskStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {boards.map((board) => (
          <SingleBoard key={board.id} board={board} tasks={projectTasks.filter((t) => t.status === board.id)} />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} className="rotate-2 cursor-grabbing shadow-xl" /> : null}
      </DragOverlay>
    </DndContext>
  );
}
