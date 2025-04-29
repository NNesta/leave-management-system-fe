import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, Clock, FileText } from "lucide-react";
import { LeaveBalanceChart } from "@/components/dashboard/LeaveBalanceChart";
import { LeaveRequestsTable } from "@/components/dashboard/LeaveRequestsTable";
import { TeamCalendar } from "@/components/dashboard/TeamCalendar";
import { useMsal } from "@azure/msal-react";
import { useLeaveBalanceByEmail } from "@/hooks/useLeaveBalance";
import { LeaveRequest } from "@/types/leaves";
import { isAfter } from "date-fns";
import { useMemo } from "react";

const Dashboard = () => {
  const { accounts } = useMsal();
  // fetch leave balance using the react query and use the accounts email as parama
  const { data: userLeaveBalances } = useLeaveBalanceByEmail(
    accounts[0].username
  );
  const pendingRequests = useMemo(() => {
    return userLeaveBalances?.filter(
      (leave: LeaveRequest) =>
        leave.status === "PENDING" &&
        isAfter(
          new Date(leave.endDate[0], leave.endDate[1] - 1, leave.endDate[2]),
          new Date()
        )
    );
  }, [userLeaveBalances]);
  console.log({ userLeaveBalances });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employee Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {accounts[0].name}</p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <Link to="/new-request">New Leave Request</Link>
          </Button>
        </div>

        {userLeaveBalances?.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {userLeaveBalances?.map((leave) => (
              <Card key={leave.leaveType.name}>
                <CardHeader className="pb-2">
                  <CardDescription>{leave.leaveType.name}</CardDescription>
                  <CardTitle className="text-2xl">
                    {leave.takenDays} / {leave.totalDays} days
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{
                        width: `${(leave.takenDays / leave.totalDays) * 100}%`,
                      }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No leave balances found</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarCheck className="mr-2 h-5 w-5" /> Leave Balance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaveBalanceChart />
            </CardContent>
          </Card>

          {pendingRequests && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" /> Upcoming Leaves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((leave) => (
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <CalendarCheck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{leave.leaveType.name}</p>
                        <p className="text-sm text-gray-500">
                          Aug 15 - Aug 20, 2025
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Approved</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="calendar">Team Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Leave Request History</CardTitle>
                <CardDescription>
                  View and manage your leave requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveRequestsTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Team Calendar</CardTitle>
                <CardDescription>
                  View team members' leaves and plan accordingly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
