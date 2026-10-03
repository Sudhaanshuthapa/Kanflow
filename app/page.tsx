import Navbar from "@/app/Components/nav-bar/navbar";
import ProjectsArea from "@/app/Components/projects-area/project-area";
import RightSideBar from "@/app/Components/right-sidebar/right-sidebar";
import AddTaskDialog from "@/app/Components/dialogs/add-task-dialog";
import { WorkshopProvider } from "@/app/Components/workshop-context";

export default function Home() {
  return (
    <WorkshopProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="grid items-start gap-6 px-6 pb-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ProjectsArea />
          <RightSideBar />
        </div>
        <AddTaskDialog />
      </main>
    </WorkshopProvider>
  );
}
