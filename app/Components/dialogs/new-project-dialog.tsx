"use client";

import * as React from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWorkshop } from "../workshop-context";

const MAX_NAME = 40;

function ProjectForm() {
  const { projects, addProject, setProjectDialogOpen } = useWorkshop();
  const [name, setName] = React.useState("");

  const trimmed = name.trim();
  const duplicate = projects.some((p) => p.name.toLowerCase() === trimmed.toLowerCase());
  const canCreate = trimmed.length > 0 && !duplicate;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (canCreate) addProject(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader className="p-6">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <FolderPlus className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Create a new workshop project to organise your orders</DialogDescription>
        </div>
      </DialogHeader>

      <div className="px-6 pb-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Project Name</span>
          <Input
            autoFocus
            value={name}
            maxLength={MAX_NAME}
            onChange={(e) => setName(e.target.value)}
            placeholder="Spring Capsule '27..."
            aria-invalid={duplicate}
            className="h-11 rounded-xl px-3"
          />
          <div className="flex justify-between text-xs">
            <span className="text-destructive">{duplicate ? "A project with this name already exists" : ""}</span>
            <span className="text-muted-foreground">
              {name.length} / {MAX_NAME} Characters
            </span>
          </div>
        </label>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setProjectDialogOpen(false)}
          className="h-10 rounded-xl bg-muted px-5 hover:bg-muted/70"
        >
          Close
        </Button>
        <Button type="submit" disabled={!canCreate} className="h-10 rounded-xl px-5">
          Create Project
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function NewProjectDialog() {
  const { projectDialogOpen, setProjectDialogOpen } = useWorkshop();

  return (
    <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
      <DialogContent className="sm:max-w-md">
        {/* mounts only while open, so the field resets each time */}
        <ProjectForm />
      </DialogContent>
    </Dialog>
  );
}
