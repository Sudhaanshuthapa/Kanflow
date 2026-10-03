"use client";

import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortOrder, useWorkshop } from "../workshop-context";

const OPTIONS: SortOrder[] = ["A-Z", "Z-A"];

export function SortingDropDown() {
  const { sortOrder, setSortOrder } = useWorkshop();
  const Icon = sortOrder === "A-Z" ? ArrowDownAZ : ArrowUpZA;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" type="button" className="h-9 gap-2 rounded-full px-3 text-muted-foreground">
            <Icon className="size-4" />
            <span className="text-sm font-medium">{sortOrder} Sort</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-36">
        {OPTIONS.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            className="h-9"
            checked={sortOrder === option}
            onCheckedChange={() => setSortOrder(option)}
          >
            {option} Sort
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
