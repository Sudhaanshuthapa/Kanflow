"use client";

import { Button } from "@/components/ui/button";
import { useWorkshop } from "../workshop-context";

export default function NewStitchButton() {
  const { setProjectDialogOpen } = useWorkshop();
  return (
    <Button onClick={() => setProjectDialogOpen(true)} className="h-10 rounded-full px-5 shadow-none">
      + New Project
    </Button>
  );
}
