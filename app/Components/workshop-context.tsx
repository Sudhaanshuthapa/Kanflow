"use client";

import * as React from "react";

export type TaskTag = "Custom" | "Repair" | "Urgent" | "Standard";
export type Priority = "Low" | "Medium" | "High";
export type TaskStatus = "queue" | "needle" | "done";
export type SortOrder = "A-Z" | "Z-A";

export type Task = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  priority: Priority;
  tag: TaskTag;
  status: TaskStatus;
};

export type Project = {
  id: string;
  name: string;
};

export type ProjectStats = {
  total: number;
  queue: number;
  inProgress: number;
  completed: number;
  /** Unfinished tasks with High priority (tagged "Urgent"). */
  dueThisWeek: number;
  /** Share of tasks in each stage, as whole-number-friendly percentages (0-100). */
  percent: { done: number; needle: number; queue: number };
};

export function computeStats(tasks: Task[]): ProjectStats {
  const total = tasks.length;
  const queue = tasks.filter((t) => t.status === "queue").length;
  const inProgress = tasks.filter((t) => t.status === "needle").length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const dueThisWeek = tasks.filter((t) => t.status !== "done" && t.priority === "High").length;
  const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100);
  return {
    total,
    queue,
    inProgress,
    completed,
    dueThisWeek,
    percent: { done: pct(completed), needle: pct(inProgress), queue: pct(queue) },
  };
}

export const PRIORITY_TO_TAG: Record<Priority, TaskTag> = {
  Low: "Standard",
  Medium: "Custom",
  High: "Urgent",
};

const seedProjects: Project[] = [
  {
    id: "autumn",
    name: "Autumn Collection '26",
  },
  {
    id: "bridal",
    name: "Bridal Couture",
  },
  {
    id: "alterations",
    name: "Winter Alterations",
  },
];

const seedTasks: Task[] = [
  { id: "t1", title: "Tailored wool overcoat", description: "Double-breasted, charcoal wool, fitting on Friday", projectId: "autumn", priority: "Medium", tag: "Custom", status: "queue" },
  { id: "t2", title: "Replace denim jacket zipper", description: "YKK brass zipper, match the original thread", projectId: "autumn", priority: "Medium", tag: "Repair", status: "queue" },
  { id: "t3", title: "Hem silk evening gown", description: "Take up 4cm, hand-finished rolled hem", projectId: "autumn", priority: "High", tag: "Urgent", status: "needle" },
  { id: "t4", title: "Cotton shirt batch", description: "Six standard-fit shirts, sizes M and L", projectId: "autumn", priority: "Low", tag: "Standard", status: "needle" },
  { id: "t5", title: "Bridal veil edging", description: "Lace trim along the cathedral veil", projectId: "bridal", priority: "High", tag: "Urgent", status: "queue" },
  { id: "t6", title: "Taper winter trousers", description: "Narrow the leg by 3cm at the knee", projectId: "alterations", priority: "Low", tag: "Standard", status: "needle" },
];

type DialogState = { open: boolean; editing: Task | null };

type WorkshopContextValue = {
  tasks: Task[];
  projects: Project[];
  addProject: (name: string) => void;
  projectDialogOpen: boolean;
  setProjectDialogOpen: (open: boolean) => void;
  activeProject: Project;
  /** Live stats for the active project, derived from its tasks. */
  stats: ProjectStats;
  setActiveProjectId: (id: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (o: SortOrder) => void;
  dialog: DialogState;
  openAddDialog: () => void;
  openEditDialog: (task: Task) => void;
  closeDialog: () => void;
  saveTask: (data: { title: string; description: string; projectId: string; priority: Priority }) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
};

const WorkshopContext = React.createContext<WorkshopContextValue | null>(null);

export function WorkshopProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = React.useState<Task[]>(seedTasks);
  const [projects, setProjects] = React.useState<Project[]>(seedProjects);
  const [projectDialogOpen, setProjectDialogOpen] = React.useState(false);
  const [activeProjectId, setActiveProjectId] = React.useState(seedProjects[0].id);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("A-Z");
  const [dialog, setDialog] = React.useState<DialogState>({ open: false, editing: null });

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0];
  const stats = React.useMemo(
    () => computeStats(tasks.filter((t) => t.projectId === activeProject.id)),
    [tasks, activeProject.id]
  );

  const addProject = (name: string) => {
    const project: Project = { id: crypto.randomUUID(), name };
    setProjects((prev) => [...prev, project]);
    setActiveProjectId(project.id);
    setProjectDialogOpen(false);
  };

  const saveTask: WorkshopContextValue["saveTask"] = (data) => {
    const editing = dialog.editing;
    if (editing) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editing.id
            ? {
                ...t,
                ...data,
                // keep the existing tag (e.g. "Repair") unless the priority actually changed
                tag: data.priority !== t.priority ? PRIORITY_TO_TAG[data.priority] : t.tag,
              }
            : t
        )
      );
    } else {
      setTasks((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...data, tag: PRIORITY_TO_TAG[data.priority], status: "queue" },
      ]);
      setActiveProjectId(data.projectId);
    }
    setDialog({ open: false, editing: null });
  };

  const value: WorkshopContextValue = {
    tasks,
    projects,
    addProject,
    projectDialogOpen,
    setProjectDialogOpen,
    activeProject,
    stats,
    setActiveProjectId,
    sortOrder,
    setSortOrder,
    dialog,
    openAddDialog: () => setDialog({ open: true, editing: null }),
    openEditDialog: (task) => setDialog({ open: true, editing: task }),
    closeDialog: () => setDialog((d) => ({ ...d, open: false })),
    saveTask,
    deleteTask: (id) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    moveTask: (id, status) =>
      setTasks((prev) => prev.map((t) => (t.id === id && t.status !== status ? { ...t, status } : t))),
  };

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const ctx = React.useContext(WorkshopContext);
  if (!ctx) throw new Error("useWorkshop must be used inside <WorkshopProvider>");
  return ctx;
}
