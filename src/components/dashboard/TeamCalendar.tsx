import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addDays, format, parseISO } from "date-fns";

// Sample leave data for team members
const teamLeaves = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=johndoe",
    type: "Annual Leave",
    startDate: "2025-08-15",
    endDate: "2025-08-20",
    status: "Approved",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?u=janesmith",
    type: "Personal Leave",
    startDate: "2025-08-05",
    endDate: "2025-08-05",
    status: "Approved",
  },
  {
    id: "3",
    name: "Bob Johnson",
    avatar: "https://i.pravatar.cc/150?u=bobjohnson",
    type: "Sick Leave",
    startDate: "2025-08-10",
    endDate: "2025-08-11",
    status: "Approved",
  },
  {
    id: "4",
    name: "Alice Williams",
    avatar: "https://i.pravatar.cc/150?u=alicewilliams",
    type: "Annual Leave",
    startDate: "2025-08-22",
    endDate: "2025-08-26",
    status: "Pending",
  },
];

// Function to generate all dates between start and end
const getDatesInRange = (startDate: string, endDate: string) => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const dates = [];
  let currentDate = start;

  while (currentDate <= end) {
    dates.push(format(currentDate, "yyyy-MM-dd"));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

// Flatten the leave data to get all dates
const getAllLeaveDates = () => {
  const allDates: { date: string; user: string; type: string }[] = [];

  teamLeaves.forEach((leave) => {
    if (leave.status === "Approved") {
      const dates = getDatesInRange(leave.startDate, leave.endDate);
      dates.forEach((date) => {
        allDates.push({
          date,
          user: leave.name,
          type: leave.type,
        });
      });
    }
  });

  return allDates;
};

export const TeamCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const allLeaveDates = getAllLeaveDates();

  // Group leaves by date for the selected date
  const getLeavesByDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return allLeaveDates.filter((leave) => leave.date === formattedDate);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>
      <div>
        {selectedDate && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">
                {format(selectedDate, "MMMM d, yyyy")}
              </h3>
              <div className="space-y-4">
                {getLeavesByDate(selectedDate).length > 0 ? (
                  getLeavesByDate(selectedDate).map((leave, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {leave.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{leave.user}</p>
                        <Badge
                          variant="outline"
                          className="mt-1 bg-blue-50 text-blue-700"
                        >
                          {leave.type}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No team members on leave</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
