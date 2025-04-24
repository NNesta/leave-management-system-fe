import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, FileText } from "lucide-react";
import { useLeaveRequestById } from "@/hooks/useLeaveRequests";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LeaveDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: leaveRequest, isLoading, error } = useLeaveRequestById(id!);

  // Function to format date array to Date object
  const formatDateArray = (dateArray: number[] | null) => {
    if (!dateArray) return "Not specified";
    return new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2]
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        Error loading leave request details
      </div>
    );
  }

  if (!leaveRequest) {
    return (
      <div className="container mx-auto py-8 px-4">Leave request not found</div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Leave Request Details
          </h1>
          <p className="text-gray-500">Request #{id}</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="space-y-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        leaveRequest.employee.fullName
                      )}`}
                    />
                    <AvatarFallback>
                      {leaveRequest.employee.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">
                      {leaveRequest.employee.fullName}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {leaveRequest.employee.role} •{" "}
                      {leaveRequest.employee.department}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(leaveRequest.status)}>
                  {leaveRequest.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Leave Type</p>
                  <p className="font-medium">{leaveRequest.leaveType.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="font-medium">
                    {leaveRequest.daysNumber || "Not specified"} days
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Start Date</p>
                  <p className="font-medium">
                    {formatDateArray(leaveRequest.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">End Date</p>
                  <p className="font-medium">
                    {formatDateArray(leaveRequest.endDate)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Reason</p>
                <p className="p-3 bg-gray-50 rounded-md">
                  {leaveRequest.leaveReason}
                </p>
              </div>

              <div>
                <div className="space-y-2">
                  {leaveRequest.supportingDocuments.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-3">
                        Supporting Documents
                      </p>
                      <div className="space-y-2">
                        {leaveRequest.supportingDocuments.map((doc) => (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={doc.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-gray-500" />
                              <span>{doc.fileName}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {doc.fileType}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {leaveRequest.comment && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Comments</p>
                    <p className="p-3 bg-gray-50 rounded-md">
                      {leaveRequest.comment}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
