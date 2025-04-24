import { User } from "@/components/user/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileSpreadsheetIcon, PenIcon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LeaveBalance } from "./type";

interface LeaveBalanceTableProps {
  leaveBalances: LeaveBalance[];
  onEdit: (leaveBalance: LeaveBalance) => void;
  onDelete: (id: string) => void;
}

const LeaveBalanceTable = ({
  leaveBalances,
  onEdit,
  onDelete,
}: LeaveBalanceTableProps) => {
  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Role",
      "Department",
      "Leave Type",
      "Total Days",
      "Taken Days",
    ];
    const csvData = leaveBalances.map((emp) =>
      [
        emp.employee.fullName,
        emp.employee.email,
        emp.employee.role,
        emp.employee.department,
        emp.leaveType.name,
        emp.totalDays,
        emp.takenDays,
      ].join(",")
    );

    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "leave-balance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="p-4 flex justify-end">
        <Button
          variant="outline"
          onClick={exportToCSV}
          className="flex items-center gap-2"
        >
          <FileSpreadsheetIcon className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Total Days</TableHead>
            <TableHead>Taken Days</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveBalances.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24 text-muted-foreground"
              >
                No leave balances found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            leaveBalances.map((leaveBalance, index) => (
              <TableRow key={leaveBalance.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {leaveBalance.employee.fullName}
                </TableCell>
                <TableCell>{leaveBalance.employee.email}</TableCell>
                <TableCell>{leaveBalance.leaveType.name}</TableCell>
                <TableCell>{leaveBalance.totalDays}</TableCell>
                <TableCell>{leaveBalance.takenDays}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(leaveBalance)}
                      aria-label={`Edit ${leaveBalance.employee.fullName}`}
                    >
                      <PenIcon className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          aria-label={`Delete ${leaveBalance.employee.fullName}`}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete{" "}
                            {leaveBalance.employee.fullName}'s record. This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(leaveBalance.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveBalanceTable;
