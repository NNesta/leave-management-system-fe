import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export const ManagerHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600">Manage your team's leave requests</p>
      </div>

      <div className="flex mt-4 md:mt-0">
        <Button variant="outline" className="mr-2 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            2
          </span>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/team-calendar">Team Calendar</Link>
        </Button>
      </div>
    </div>
  );
};
