"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task, useWorkshop } from "../workshop-context";

export default function TasksDropDown({ task }: { task: Task }) {
  const { openEditDialog, deleteTask } = useWorkshop();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" type="button" aria-label="Task options">
            <MoreHorizontal className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem className="gap-2 p-2.5" onClick={() => openEditDialog(task)}>
          <Pencil className="size-4" />
          <span>Edit Task</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 p-2.5 text-red-600" onClick={() => deleteTask(task.id)}>
          <Trash2 className="size-4" />
          <span>Delete Task</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
