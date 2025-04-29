import { useLeaveRequestsByStatus } from "@/hooks/useLeaveRequests";
import { LeaveRequest } from "@/types/leaves";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { LeaveBalance } from "../leave-balance/type";
import { useLeaveBalancesByEmail } from "@/hooks/useLeaveBalance";
import { useMsal } from "@azure/msal-react";

const processLeaveData = (leaveBalances: LeaveBalance[]) => {
  // Create a map to store leave counts by type
  const leaveCountsByType = leaveBalances.reduce((acc, balance) => {
    const leaveType = balance.leaveType.name;
    if (!acc[leaveType]) {
      acc[leaveType] = {
        total: balance.totalDays || 0,
        used: balance.takenDays || 0,
        remaining: balance.totalDays - balance.takenDays || 0,
      };
    }

    return acc;
  }, {} as Record<string, { total: number; used: number; remaining: number }>);

  // Convert the map to an array format for the chart
  return Object.entries(leaveCountsByType).map(([type, data]) => ({
    type,
    total: data.total,
    used: data.used,
    remaining: data.remaining,
  }));
};

export const LeaveBalanceChart = () => {
  const { accounts } = useMsal();
  const email = accounts[0].username;
  const {
    data: leaveBalances,
    isLoading,
    error,
  } = useLeaveBalancesByEmail(email);

  if (isLoading) {
    return (
      <div className="w-full h-72 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-72 flex items-center justify-center text-red-500">
        Error loading leave data
      </div>
    );
  }

  const chartData = processLeaveData(leaveBalances || []);
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" name="Total Leave" fill="#3b82f6" />
          <Bar dataKey="used" name="Used Leave" fill="#10b981" />
          <Bar dataKey="remaining" name="Remaining Leave" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
