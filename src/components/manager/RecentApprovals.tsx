import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LeaveRequest } from "@/components/manager/types";

interface RecentApprovalsProps {
  approvals: LeaveRequest[];
}

export const RecentApprovals = ({ approvals }: RecentApprovalsProps) => {
  console.log({ approvals });
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
        <CardTitle>Recently Approved Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {approvals?.map((approval) => (
            <div key={approval.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={approval?.user.avatar.url}
                      alt={approval?.user.fullName}
                    />
                    <AvatarFallback>
                      {approval?.user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{approval?.user.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {approval?.leaveType.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Approved
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(approval.startDate.toString())}
                    {approval.startDate !== approval.endDate &&
                      ` - ${formatDate(approval.endDate.toString())}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
