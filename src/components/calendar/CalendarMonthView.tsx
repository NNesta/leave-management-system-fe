import { format, isSameDay, isWithinInterval } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CalendarDay, CalendarEvent, PublicHoliday } from "./types";

interface CalendarMonthViewProps {
  days: CalendarDay[];
  currentMonth: Date;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarMonthView = ({
  days,
  currentMonth,
  onEventClick,
}: CalendarMonthViewProps) => {
  // Helper function to check if event spans multiple days
  const isMultiDayEvent = (event: CalendarEvent) => {
    return !isSameDay(event.startDate, event.endDate);
  };

  // Helper function to check if this is the start day of the event
  const isEventStartDay = (event: CalendarEvent, date: Date) => {
    return isSameDay(event.startDate, date);
  };

  // Helper function to check if this is the end day of the event
  const isEventEndDay = (event: CalendarEvent, date: Date) => {
    return isSameDay(event.endDate, date);
  };

  // Helper function to determine the display of an event
  const getEventDisplay = (event: CalendarEvent, date: Date) => {
    // Define base styles
    const baseClasses = "text-xs py-1 px-2 rounded-sm overflow-hidden truncate";

    // If it's a half-day event
    if (event.isHalfDay) {
      return (
        <div
          className={`${baseClasses} ml-0`}
          style={{
            backgroundColor: `${event.color}40`,
            borderLeft: `3px solid ${event.color}`,
          }}
        >
          <span className="font-medium">{event.title} (Half Day)</span>
          <span className="ml-1 text-gray-600">{event.user.name}</span>
        </div>
      );
    }

    // If it's the first day of a multi-day event
    if (isMultiDayEvent(event) && isEventStartDay(event, date)) {
      return (
        <div
          className={`${baseClasses} rounded-r-none`}
          style={{ backgroundColor: event.color, color: "white" }}
        >
          <span className="font-medium">{event.title}</span>
          <span className="ml-1">{event.user.name}</span>
        </div>
      );
    }

    // If it's the last day of a multi-day event
    if (isMultiDayEvent(event) && isEventEndDay(event, date)) {
      return (
        <div
          className={`${baseClasses} rounded-l-none`}
          style={{ backgroundColor: event.color, color: "white" }}
        >
          &nbsp;
        </div>
      );
    }

    // If it's a middle day of a multi-day event
    if (
      isMultiDayEvent(event) &&
      isWithinInterval(date, { start: event.startDate, end: event.endDate }) &&
      !isEventStartDay(event, date) &&
      !isEventEndDay(event, date)
    ) {
      return (
        <div
          className={`${baseClasses} rounded-none`}
          style={{ backgroundColor: event.color, color: "white" }}
        >
          &nbsp;
        </div>
      );
    }

    // If it's a single-day event
    return (
      <div
        className={`${baseClasses}`}
        style={{ backgroundColor: event.color, color: "white" }}
      >
        <span className="font-medium">{event.title}</span>
        <span className="ml-1">{event.user.name}</span>
      </div>
    );
  };

  // Helper function to render holiday badges
  const renderHolidays = (holidays: PublicHoliday[]) => {
    if (holidays.length === 0) return null;

    return holidays.map((holiday) => (
      <Badge
        key={holiday.id}
        variant="secondary"
        className="mb-1 bg-red-50 text-red-700 border border-red-100"
      >
        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
        {holiday.name}
      </Badge>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((day, dayIdx) => (
          <div
            key={dayIdx}
            className={`min-h-[120px] bg-white relative ${
              !day.isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
            } ${day.isToday ? "bg-blue-50" : ""}`}
          >
            <div className="px-2 py-1">
              <span
                className={`text-sm font-medium ${
                  day.isToday
                    ? "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
                    : ""
                }`}
              >
                {format(day.date, "d")}
              </span>
            </div>

            {/* Holidays */}
            <div className="px-1 space-y-1 mt-1">
              {renderHolidays(day.holidays)}
            </div>

            {/* Events */}
            <div className="px-1 space-y-1 mt-1">
              {day.events.map((event) => (
                <div
                  key={`${event.id}-${format(day.date, "yyyy-MM-dd")}`}
                  onClick={() => onEventClick(event)}
                  className="cursor-pointer"
                >
                  {getEventDisplay(event, day.date)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
