import { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  format,
  addDays,
  subDays,
} from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarEvent, CalendarViewMode, CalendarDay } from "./types";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarMonthView } from "./CalendarMonthView";
import { LEAVE_EVENTS, PUBLIC_HOLIDAYS } from "./mock-data";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export const TeamCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [viewMode, setViewMode] = useState<CalendarViewMode>("month");
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [filteredEvents, setFilteredEvents] =
    useState<CalendarEvent[]>(LEAVE_EVENTS);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLeaveType, setSelectedLeaveType] = useState("all");

  // Apply filters to events
  useEffect(() => {
    let events = [...LEAVE_EVENTS];

    // Filter by department
    if (selectedDepartment !== "all") {
      events = events.filter(
        (event) => event.department === selectedDepartment
      );
    }

    // Filter by leave type
    if (selectedLeaveType !== "all") {
      events = events.filter((event) => event.type === selectedLeaveType);
    }

    setFilteredEvents(events);
  }, [selectedDepartment, selectedLeaveType]);

  // Generate calendar days
  useEffect(() => {
    const generateDays = () => {
      // For month view
      if (viewMode === "month") {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const daysInMonth = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });

        const calendarDays: CalendarDay[] = daysInMonth.map((date) => {
          // Find events for this day
          const dayEvents = filteredEvents.filter((event) =>
            isWithinInterval(date, {
              start: startOfWeek(event.startDate),
              end: endOfWeek(event.endDate),
            })
          );

          // Find holidays for this day
          const holidays = PUBLIC_HOLIDAYS.filter((holiday) =>
            isSameDay(holiday.date, date)
          );

          return {
            date,
            events: dayEvents,
            isCurrentMonth: isSameMonth(date, currentDate),
            isToday: isSameDay(date, new Date()),
            holidays,
          };
        });

        setDays(calendarDays);
      }
      // Additional code for week and day views would go here
    };

    generateDays();
  }, [currentDate, viewMode, filteredEvents]);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handlePrevious = () => {
    if (viewMode === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewMode === "week") {
      setCurrentDate(subDays(currentDate, 7));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewMode === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = () => {
    toast({
      title: "Add Leave Request",
      description: "Redirecting to create a new leave request...",
    });
    // In a real app, you would navigate to the new leave request page
  };

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <CalendarHeader
          currentDate={currentDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedLeaveType={selectedLeaveType}
          onLeaveTypeChange={setSelectedLeaveType}
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleAddEvent}
        >
          Add Leave
        </Button>
      </div>

      {viewMode === "month" && (
        <CalendarMonthView
          days={days}
          currentMonth={currentDate}
          onEventClick={handleEventClick}
        />
      )}

      {/* For the future: Week and Day views would go here */}

      {/* Event details dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave Details</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src={selectedEvent.employee.avatar}
                    alt={selectedEvent.employee.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedEvent.employee.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedEvent.employee.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Leave Type</p>
                  <p className="font-medium">{selectedEvent.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div>{getStatusBadge(selectedEvent.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">
                    {format(selectedEvent.startDate, "PP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">
                    {format(selectedEvent.endDate, "PP")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {selectedEvent.isHalfDay
                    ? "Half Day"
                    : `${Math.ceil(
                        (selectedEvent.endDate.getTime() -
                          selectedEvent.startDate.getTime()) /
                          (1000 * 60 * 60 * 24) +
                          1
                      )} days`}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
