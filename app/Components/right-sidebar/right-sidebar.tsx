import { Card } from "@/components/ui/card";
import ProjectSelectionDropDown from "../drop-downs/project-selection/project-selection";
import CircularProgress from "./circular-progress";
import TasksStats from "./tasks-stats";

export default function RightSideBar() {
  return (
    <Card className="gap-6 rounded-3xl border-transparent p-6 shadow-none">
      <ProjectSelectionDropDown />
      <CircularProgress />
      <TasksStats />
    </Card>
  );
}
