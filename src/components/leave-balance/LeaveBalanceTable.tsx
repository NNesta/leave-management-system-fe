import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LeaveBalance } from "@/pages/LeaveBalance";

interface LeaveBalanceTableProps {
  leaveBalances: LeaveBalance[];
  onEdit: (leaveBalance: LeaveBalance) => void;
  onDelete: (id: string) => void;
}

export function LeaveBalanceTable({
  leaveBalances,
  onEdit,
  onDelete,
}: LeaveBalanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Email</TableHead>
          <TableHead>Taken Days</TableHead>
          <TableHead>Total Days</TableHead>
          <TableHead>Leave Types</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveBalances.map((balance) => (
          <TableRow key={balance.id}>
            <TableCell>{balance.employeeEmail}</TableCell>
            <TableCell>{balance.takenDays}</TableCell>
            <TableCell>{balance.totalDays}</TableCell>
            <TableCell>
              <div className="flex gap-2 flex-wrap">
                {balance.leaveTypes.map((type) => (
                  <Badge key={type} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(balance)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(balance.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
