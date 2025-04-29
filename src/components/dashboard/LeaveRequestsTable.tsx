import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { Link } from "react-router-dom";

export const LeaveRequestsTable = () => {
  const { data: leaveRequests, isLoading, isError, error } = useLeaveRequests();
  console.log({ leaveRequests });
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

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) return <div>Loading leave requests...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Date Range</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Days</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">
              {request.leaveType.name}
            </TableCell>
            <TableCell>
              {formatDate(request.startDate)}
              {request.startDate !== request.endDate &&
                ` - ${formatDate(request.endDate)}`}
            </TableCell>
            <TableCell>{request.user.fullName}</TableCell>
            <TableCell>{request?.daysNumber}</TableCell>
            <TableCell>
              <Badge
                className={getStatusColor(request.status)}
                variant="outline"
              >
                {request.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                <Link className="flex items-center" to={`/leave/${request.id}`}>
                  <FileText className="h-4 w-4 mr-1" /> Details
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
