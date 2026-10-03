import { Scissors } from "lucide-react";

export default function AppNameAndLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Scissors className="size-5" />
      </div>
      <span className="text-xl font-bold tracking-tight">Stitch</span>
    </div>
  );
}
