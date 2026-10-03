import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="relative w-72">
      <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="h-10 rounded-full border-transparent bg-white pl-10 shadow-none dark:bg-input/30"
        placeholder="Search patterns, orders..."
      />
    </div>
  );
}
