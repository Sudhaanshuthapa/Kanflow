import { Card } from "@/components/ui/card";
import ProjectsAreaHeader from "./project-header/project-header";
import ProjectsAreaTaskBoards from "./project-taskboards/project-taskboards";

export default function ProjectsArea() {
  return (
    <Card className="gap-6 rounded-3xl border-transparent p-6 shadow-none">
      <ProjectsAreaHeader />
      <ProjectsAreaTaskBoards />
    </Card>
  );
}
