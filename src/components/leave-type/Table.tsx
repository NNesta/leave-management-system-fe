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
import { LeaveType } from "./type";

interface LeaveTypeTableProps {
  leaveTypes: LeaveType[];
  onEdit: (leaveType: LeaveType) => void;
  onDelete: (id: string) => void;
}

const LeaveTypeTable = ({
  leaveTypes,
  onEdit,
  onDelete,
}: LeaveTypeTableProps) => {
  const exportToCSV = () => {
    const headers = [
      "Name",
      "Default Days",
      "Default Accrual Rate",
      "Max Carry Forward",
    ];
    const csvData = leaveTypes.map((emp) =>
      [
        emp.name,
        emp.defaultDays,
        emp.defaultAccrualRate,
        emp.maxCarryForward,
      ].join(",")
    );

    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "leave-types.csv");
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
            <TableHead>Name</TableHead>
            <TableHead>Default Days</TableHead>
            <TableHead>Default Accrual Rate</TableHead>
            <TableHead>Max Carry Forward</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveTypes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center h-24 text-muted-foreground"
              >
                No leave types found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            leaveTypes.map((leaveType, index) => (
              <TableRow key={leaveType.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{leaveType.name}</TableCell>
                <TableCell>{leaveType.defaultDays}</TableCell>
                <TableCell>{leaveType.defaultAccrualRate}</TableCell>
                <TableCell>{leaveType.maxCarryForward}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(leaveType)}
                      aria-label={`Edit ${leaveType.name}`}
                    >
                      <PenIcon className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          aria-label={`Delete ${leaveType.name}`}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {leaveType.name}'s
                            record. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(leaveType.id)}
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

export default LeaveTypeTable;
