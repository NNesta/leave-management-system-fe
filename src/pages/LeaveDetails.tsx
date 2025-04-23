import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";

// Mock data for a single leave request
const leaveRequest = {
  id: "1",
  type: "Annual Leave",
  startDate: "2025-08-15",
  endDate: "2025-08-20",
  days: 6,
  status: "Pending",
  reason: "Family vacation planned with parents visiting from overseas",
  supportingDocs: [
    {
      name: "Flight_Tickets.pdf",
      size: "2.4 MB",
      type: "application/pdf",
    },
    {
      name: "Hotel_Booking.pdf",
      size: "1.8 MB",
      type: "application/pdf",
    },
  ],
  employee: {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=johndoe",
    position: "Software Engineer",
    department: "Engineering",
  },
};

const LeaveDetails = () => {
  const { id } = useParams();

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
                    <AvatarImage src={leaveRequest.employee.avatar} />
                    <AvatarFallback>
                      {leaveRequest.employee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">
                      {leaveRequest.employee.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {leaveRequest.employee.position} •{" "}
                      {leaveRequest.employee.department}
                    </p>
                  </div>
                </div>
                <Badge
                  className={getStatusColor(leaveRequest.status)}
                  variant="outline"
                >
                  {leaveRequest.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Leave Type</p>
                  <p className="font-medium">{leaveRequest.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="font-medium">{leaveRequest.days} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Start Date</p>
                  <p className="font-medium">
                    {formatDate(leaveRequest.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">End Date</p>
                  <p className="font-medium">
                    {formatDate(leaveRequest.endDate)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Reason</p>
                <p className="p-3 bg-gray-50 rounded-md">
                  {leaveRequest.reason}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-3">
                  Supporting Documents
                </p>
                <div className="space-y-2">
                  {leaveRequest.supportingDocs.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-gray-500" />
                        <span>{doc.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{doc.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
