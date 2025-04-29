import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotificationBell from "../NotificationBell";
import { useMsal } from "@azure/msal-react";
import { useUserByEmail } from "@/hooks/useEmployee";

export const ManagerHeader = () => {
  const { accounts } = useMsal();
  const { data: user } = useUserByEmail(accounts[0]?.username);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600">Manage your team's leave requests</p>
      </div>

      <div className="flex mt-4 md:mt-0">
        <NotificationBell userId={user?.id} />
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/team-calendar">Team Calendar</Link>
        </Button>
      </div>
    </div>
  );
};
