"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkshop } from "../../workshop-context";

export default function ProjectSelectionDropDown() {
  const { projects, activeProject, setActiveProjectId } = useWorkshop();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-full items-center justify-between rounded-2xl bg-muted px-4 py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="flex flex-col">
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">ACTIVE WORKSHOP</span>
          <span className="text-sm font-semibold">{activeProject.name}</span>
        </span>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-56">
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            className="h-9 justify-between"
            onClick={() => setActiveProjectId(project.id)}
          >
            {project.name}
            {project.id === activeProject.id && <Check className="size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
