"use client";

import { Button } from "@/components/ui/button";
import { SortingDropDown } from "../../drop-downs/sorting-drop-down";
import { useWorkshop } from "../../workshop-context";

export default function ProjectsAreaHeader() {
  const { openAddDialog } = useWorkshop();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Design Workshop</h1>
      <div className="flex items-center gap-2">
        <SortingDropDown />
        <Button
          variant="outline"
          onClick={openAddDialog}
          className="h-9 rounded-full border-2 border-dashed border-primary/50 bg-transparent px-4 text-primary hover:bg-primary/10 hover:text-primary dark:bg-transparent"
        >
          + Add Task
        </Button>
      </div>
    </div>
  );
}
