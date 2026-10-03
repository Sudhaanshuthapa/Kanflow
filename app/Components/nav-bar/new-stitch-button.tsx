"use client";

import { Button } from "@/components/ui/button";
import { useWorkshop } from "../workshop-context";

export default function NewStitchButton() {
  const { openAddDialog } = useWorkshop();
  return (
    <Button onClick={openAddDialog} className="h-10 rounded-full px-5 shadow-none">
      + New Project
    </Button>
  );
}
