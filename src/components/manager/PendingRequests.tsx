import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { LeaveRequest } from "@/components/manager/types";
import { countWorkingDays } from "@/lib/countWorkingDays";
import UserAvatar from "../ui/UserAvatar";

interface PendingRequestsProps {
  requests: LeaveRequest[];
  activeRequest: LeaveRequest;
  onRequestSelect: (request: LeaveRequest) => void;
}

export const PendingRequests = ({
  requests,
  activeRequest,
  onRequestSelect,
}: PendingRequestsProps) => {
  console.log({ requests });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" /> Pending Approvals
        </CardTitle>
        <CardDescription>
          {requests?.length || 0} requests need your attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length !== 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  activeRequest?.id === request?.id
                    ? "border-blue-600 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onRequestSelect(request)}
              >
                <div className="flex items-center mb-2">
                  {request?.user && (
                    <UserAvatar
                      avatarUrl={request?.user?.avatar?.url}
                      name={request?.user?.fullName}
                    />
                  )}
                  <div>
                    <p className="font-medium">{request.user.fullName}</p>
                    <p className="text-sm text-gray-500">{request.user.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 mt-1"
                  >
                    {request.leaveType.name}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {request?.daysNumber} days
                  </span>
                </div>
                <p className="text-sm mt-2">
                  {formatDate(request.startDate.toString())}
                  {request.startDate !== request.endDate &&
                    ` - ${formatDate(request.endDate.toString())}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-gray-500">No pending requests</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
