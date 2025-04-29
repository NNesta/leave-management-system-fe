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
import TeamCalendar from "./TeamCalendar";

const Manager = () => {
  const { data: pendingRequests } = useLeaveRequestsByStatus("PENDING");
  const { data: recentApprovals } = useLeaveRequestsByStatus("APPROVED");
  const [activeRequest, setActiveRequest] = useState<LeaveRequest>(
    pendingRequests?.[0] || null
  );
  console.log({ pendingRequests, recentApprovals });

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
            </TabsList>
            <TabsContent value="recent">
              <RecentApprovals approvals={recentApprovals} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Manager;
