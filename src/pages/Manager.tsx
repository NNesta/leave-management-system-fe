import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveRequest } from "@/components/manager/types";
import { ManagerHeader } from "@/components/manager/ManagerHeader";
import { PendingRequests } from "@/components/manager/PendingRequests";
import { RequestDetails } from "@/components/manager/RequestDetails";
import { RecentApprovals } from "@/components/manager/RecentApprovals";
import { CalendarCheck } from "lucide-react";
import { useLeaveRequestsByStatus } from "@/hooks/useLeaveRequests";

const Manager = () => {
  const { data: pendingRequests } = useLeaveRequestsByStatus("Pending");
  const { data: recentApprovals } = useLeaveRequestsByStatus("Approved");
  const [activeRequest, setActiveRequest] = useState<LeaveRequest>(
    pendingRequests?.[0] || null
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <ManagerHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PendingRequests
              requests={pendingRequests || []}
              activeRequest={activeRequest}
              onRequestSelect={setActiveRequest}
            />
          </div>

          <div className="lg:col-span-2">
            <RequestDetails request={activeRequest} />
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="recent">
            <TabsList>
              <TabsTrigger value="recent">Recent Approvals</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Leaves</TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              <RecentApprovals approvals={recentApprovals} />
            </TabsContent>
            <TabsContent value="upcoming">
              <Card>
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <CalendarCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {"Team calendar will be shown here"}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Manager;
