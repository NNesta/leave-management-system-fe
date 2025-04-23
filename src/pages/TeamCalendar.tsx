import { useState } from "react";
import { TeamCalendarView } from "@/components/calendar/TeamCalendarView";

const TeamCalendar = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Team Calendar</h1>
      <TeamCalendarView />
    </div>
  );
};

export default TeamCalendar;
