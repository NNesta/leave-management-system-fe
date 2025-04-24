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

const processLeaveData = (leaveRequests: LeaveRequest[]) => {
  // Create a map to store leave counts by type
  const leaveCountsByType = leaveRequests.reduce((acc, request) => {
    const leaveType = request.leaveType.name;
    if (!acc[leaveType]) {
      acc[leaveType] = {
        total: request.leaveType.defaultDays || 0,
        used: 0,
        remaining: request.leaveType.defaultDays || 0,
      };
    }

    // Only count approved leaves
    if (request.status.toUpperCase() === "APPROVED") {
      acc[leaveType].used += request.daysNumber || 0;
      acc[leaveType].remaining = acc[leaveType].total - acc[leaveType].used;
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
  const {
    data: leaveRequests,
    isLoading,
    error,
  } = useLeaveRequestsByStatus("Approved");

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

  const chartData = processLeaveData(leaveRequests || []);
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
          <Bar dataKey="personal" name="Personal Leave" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
