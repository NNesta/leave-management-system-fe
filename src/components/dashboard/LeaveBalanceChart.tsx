
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for the chart
const data = [
  { month: 'Jan', annual: 20, sick: 10, personal: 5 },
  { month: 'Feb', annual: 19, sick: 10, personal: 5 },
  { month: 'Mar', annual: 18, sick: 9, personal: 5 },
  { month: 'Apr', annual: 17, sick: 9, personal: 4 },
  { month: 'May', annual: 15, sick: 8, personal: 4 },
  { month: 'Jun', annual: 15, sick: 8, personal: 3 },
];

export const LeaveBalanceChart = () => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="annual" name="Annual Leave" fill="#3b82f6" />
          <Bar dataKey="sick" name="Sick Leave" fill="#10b981" />
          <Bar dataKey="personal" name="Personal Leave" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
