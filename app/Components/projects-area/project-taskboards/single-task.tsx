import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import TasksDropDown from "../../drop-downs/tasks-drop-down";

export default function SingleTask() {
  return (
    <Card className="shadow-none">
      {/* single task header */}
      <CardHeader className="p-4 ">
        <div className="flex justify-between items-center">
          {/* priority container */}
          <div
            className="p-1 py-[4px] bg-green-500/15 rounded-3xl px-2 pr-4 font-medium text-green-900 flex items-center gap-1 text-sm"
          >
            {/* priority icon */}
            <MdKeyboardDoubleArrowDown className="mb-[2px]" />
            {/* priority */}
            <span className="text-[12px]">Low</span>
          </div>
          {/* more options drop down */}
          <TasksDropDown />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mt-1">
        <span className="font-bold text-lg">Copywriteing content</span>
        <span className="text-sm text-gray-600">
          Create content for a client today every day
        </span>
      </CardContent>
    </Card>
  );
}---