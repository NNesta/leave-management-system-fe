import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LeaveRequest } from "@/components/manager/types";
import { countWorkingDays } from "@/lib/countWorkingDays";
import { SupportingDocument } from "./SupportingDocument";
import {
  useApproveLeaveRequest,
  useRejectLeaveRequest,
} from "@/hooks/useLeaveRequests";
import { useMsal } from "@azure/msal-react";
import { createCalendarEvent } from "@/lib/createCalendarEvent";
import { sendEmail } from "@/lib/sendEmail";
import { useState } from "react";

interface RequestDetailsProps {
  request: LeaveRequest;
}

export const RequestDetails = ({ request }: RequestDetailsProps) => {
  const { instance, accounts } = useMsal();
  const [comment, setComment] = useState("");
  const { mutate: rejectRequest, isPending: isRejectPending } =
    useRejectLeaveRequest(comment);
  const { mutate: approveRequest, isPending: isApprovePending } =
    useApproveLeaveRequest(comment);

  const handleApprove = () => {
    approveRequest(request?.id || "");
    createCalendarEvent(instance, accounts[0], request);
    sendEmail(instance, accounts[0], request);
  };

  const handleReject = () => {
    rejectRequest(request?.id || "");
  };

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
        <CardTitle>Request Details</CardTitle>
        <CardDescription>Review and respond to leave request</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-center mb-6">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage
                src={request?.employee.avatar}
                alt={request?.employee.fullName}
              />
              <AvatarFallback>
                {request?.employee.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium">
                {request?.employee.fullName}
              </h3>
              <p className="text-gray-500">{request?.employee.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Leave Type</p>
              <p className="font-medium">{request?.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="font-medium">
                {countWorkingDays(request?.startDate, request?.endDate)} days
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">From</p>
              <p className="font-medium">{formatDate(request?.startDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">To</p>
              <p className="font-medium">{formatDate(request?.endDate)}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Reason</p>
            <p className="p-3 bg-gray-50 rounded-md">{request?.leaveReason}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Supporting Documents</p>
            <SupportingDocument
              documents={request?.supportingDocuments || []}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Your Comments</p>
            <Textarea
              placeholder="Add comments about this leave request..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              {isApprovePending ? "Approving..." : "Approve Request"}
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 flex-1"
            >
              {isRejectPending ? "Rejecting..." : "Reject Request"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
