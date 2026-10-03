"use client";

import * as React from "react";
import { Check, ChevronDown, ClipboardList, Flag, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Priority, useWorkshop } from "../workshop-context";

const MAX_DESCRIPTION = 50;
const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

type Option = { value: string; label: string };

/** Custom dropdown "select": the active item is shown with a green icon. */
function SelectField({
  label,
  options,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  icon: React.ElementType;
}) {
  const active = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <span className="flex items-center gap-2.5">
            <ActiveIcon icon={Icon} />
            {active.label}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="h-10 justify-between"
              onClick={() => onChange(option.value)}
            >
              <span className="flex items-center gap-2.5">
                {option.value === value ? <ActiveIcon icon={Icon} /> : <span className="size-6" />}
                {option.label}
              </span>
              {option.value === value && <Check className="size-4 text-emerald-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ActiveIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="flex size-6 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-600">
      <Icon className="size-3.5" />
    </span>
  );
}

function TaskForm() {
  const { dialog, projects, activeProject, saveTask, closeDialog } = useWorkshop();
  const editing = dialog.editing;

  const [title, setTitle] = React.useState(editing?.title ?? "");
  const [description, setDescription] = React.useState(editing?.description ?? "");
  const [projectId, setProjectId] = React.useState(editing?.projectId ?? activeProject.id);
  const [priority, setPriority] = React.useState<Priority>(editing?.priority ?? "Low");

  const canSave = title.trim().length > 0;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!canSave) return;
    saveTask({ title: title.trim(), description: description.trim(), projectId, priority });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader className="p-6">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <ClipboardList className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <DialogTitle>{editing ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogDescription>Fill in the form below to create or modify a task</DialogDescription>
        </div>
      </DialogHeader>

      <div className="grid gap-6 px-6 pb-6 sm:grid-cols-2">
        {/* left column */}
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Task Title</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Joe Doe..."
              className="h-11 rounded-xl px-3"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Task Description</span>
            <Textarea
              value={description}
              maxLength={MAX_DESCRIPTION}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give a description of the task..."
              className="min-h-28 rounded-xl"
            />
            <span className="text-xs text-muted-foreground">
              {description.length} / {MAX_DESCRIPTION} Caracters
            </span>
          </label>
        </div>

        {/* right column */}
        <div className="flex flex-col gap-5">
          <SelectField
            label="Projects"
            icon={Folder}
            value={projectId}
            onChange={setProjectId}
            options={projects.map((p) => ({ value: p.id, label: p.name }))}
          />
          <SelectField
            label="Priority"
            icon={Flag}
            value={priority}
            onChange={(v) => setPriority(v as Priority)}
            options={PRIORITIES.map((p) => ({ value: p, label: p }))}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="secondary" onClick={closeDialog} className="h-10 rounded-xl bg-muted px-5 hover:bg-muted/70">
          Close
        </Button>
        <Button
          type="submit"
          disabled={!canSave}
          className="h-10 rounded-xl bg-emerald-500 px-5 text-white hover:bg-emerald-600"
        >
          {editing ? "Save Task" : "Add Task"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function AddTaskDialog() {
  const { dialog, closeDialog } = useWorkshop();

  return (
    <Dialog open={dialog.open} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent>
        {/* TaskForm mounts only while open, so its state resets every time */}
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}
