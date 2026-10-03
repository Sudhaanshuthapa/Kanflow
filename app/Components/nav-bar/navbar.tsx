import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/app/mode-toggle";
import SearchBar from "./search-bar";
import AppNameAndLogo from "./logo-app";
import NewStitchButton from "./new-stitch-button";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-6">
      <div className="flex items-center gap-12">
        <AppNameAndLogo />
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Separator orientation="vertical" className="h-5" />
        <NewStitchButton />
      </div>
    </header>
  );
}
