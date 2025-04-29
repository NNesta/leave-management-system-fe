import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarViewMode } from "./types";
import { useAllDepartments } from "@/hooks/useDepartment";
import { useAllLeaveTypes } from "@/hooks/useLeaveType";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  viewMode: CalendarViewMode;
  onViewModeChange: (mode: CalendarViewMode) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedLeaveType: string;
  onLeaveTypeChange: (leaveType: string) => void;
}

export const CalendarHeader = ({
  currentDate,
  onPrevious,
  onNext,
  onToday,
  viewMode,
  onViewModeChange,
  selectedDepartment,
  onDepartmentChange,
  selectedLeaveType,
  onLeaveTypeChange,
}: CalendarHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: allDepartments } = useAllDepartments();
  const { data: allLeaveTypes } = useAllLeaveTypes();
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold flex items-center">
            <CalendarIcon className="mr-2 h-6 w-6" />
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex space-x-1 ml-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrevious}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onToday}
              className="h-8"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onNext}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={isFilterOpen ? "default" : "outline"}
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="h-8"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="bg-white p-4 rounded-md shadow-sm mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <Select
              value={selectedDepartment}
              onValueChange={onDepartmentChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {[{ id: 0, name: "All Departments" }, ...allDepartments].map(
                  (dept) => (
                    <SelectItem
                      key={dept.id.toString()}
                      value={dept.id.toString()}
                    >
                      {dept.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <Select value={selectedLeaveType} onValueChange={onLeaveTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                {[{ id: 0, name: "All Leave Types" }, ...allLeaveTypes].map(
                  (type) => (
                    <SelectItem
                      key={type.id.toString()}
                      value={type.id.toString()}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: type.color }}
                        ></div>
                        {type.name}
                      </div>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};
