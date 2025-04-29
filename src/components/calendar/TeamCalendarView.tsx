import { useState, useEffect, useMemo } from "react";
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
import { CalendarHeader } from "./CalendarHeader";
import { CalendarMonthView } from "./CalendarMonthView";
import { PUBLIC_HOLIDAYS } from "./mock-data";
import { Badge } from "@/components/ui/badge";
import { LeaveRequest } from "../manager/types";
import { useLeaveRequestsByStatus } from "@/hooks/useLeaveRequests";
import { CalendarEvent, CalendarViewMode } from "./types";
import { Link } from "react-router-dom";

// Helper function to convert API leave requests to calendar events
const convertToCalendarEvents = (leaveRequests: LeaveRequest[]) => {
  if (!leaveRequests) {
    return null;
  }
  return leaveRequests.map((request) => ({
    id: request.id.toString(),
    title: request.leaveType.name,
    startDate: subDays(
      new Date(
        request.startDate[0],
        request.startDate[1] - 1,
        request.startDate[2]
      ),
      1
    ),
    endDate: addDays(
      new Date(request.endDate[0], request.endDate[1] - 1, request.endDate[2]),
      3
    ),
    type: request.leaveType,
    isHalfDay: request.isHalfDay,
    department: request.user.department,
    user: {
      name: request.user.fullName,
      email: request.user.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        request.user.fullName
      )}`,
    },
    status: request.status.toLowerCase() as "pending" | "approved" | "rejected",
    color: "#3b82f6", // You can map colors based on leave type if needed
  }));
};

export const TeamCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [viewMode, setViewMode] = useState<CalendarViewMode>("month");
  const [days, setDays] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("0");
  const [selectedLeaveType, setSelectedLeaveType] = useState("0");

  // Fetch leave requests using React Query
  const {
    data: leaveRequests,
    isLoading,
    error,
  } = useLeaveRequestsByStatus("APPROVED");
  console.log({ selectedLeaveType });
  console.log(convertToCalendarEvents(leaveRequests), "+++++");

  // Convert API data to calendar events
  const filteredEvents = useMemo(() => {
    if (!leaveRequests) return [];
    return convertToCalendarEvents(leaveRequests).filter((event) => {
      const departmentMatch =
        selectedDepartment === "0" ||
        event.department?.id.toString() == selectedDepartment;
      const typeMatch =
        selectedLeaveType == "0" ||
        event.type.id.toString() == selectedLeaveType;
      return departmentMatch && typeMatch;
    });
  }, [leaveRequests, selectedDepartment, selectedLeaveType]);

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

        const calendarDays = daysInMonth.map((date) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading calendar...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error loading calendar data. Please try again.
      </div>
    );
  }

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
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="https://outlook.office365.com/calendar/view/workweek">
            View in Outlook Calendar
          </Link>
        </Button>
      </div>

      {viewMode === "month" && (
        <CalendarMonthView days={days} onEventClick={handleEventClick} />
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
                    src={selectedEvent.user.avatar}
                    alt={selectedEvent.user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedEvent.user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedEvent.user.email}
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
                  <div>
                    {getStatusBadge(selectedEvent.status.toLowerCase())}
                  </div>
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
