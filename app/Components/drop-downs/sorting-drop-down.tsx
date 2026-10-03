"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

const OPTIONS = ["A-Z", "Z-A"];

export function SortingDropDown() {
  const [selectedOption, setSelectedOption] = React.useState("A-Z");

  return (
    <DropdownMenu>
      {/* Trigger Button */}
      <DropdownMenuTrigger>
        <Button variant="ghost" type="button">
          <span className="font-medium text-sm">{selectedOption}</span>
          {selectedOption === "A-Z" ? (
            <IoMdArrowDown className="text-sm" />
          ) : (
            <IoMdArrowUp className="text-sm" />
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Options Menu */}
      <DropdownMenuContent className="w-20 poppins">
        {OPTIONS.map((option, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            className="h-9"
            checked={selectedOption === option}
            onCheckedChange={() => setSelectedOption(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}