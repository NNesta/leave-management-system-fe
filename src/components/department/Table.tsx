import { Department } from "@/components/department/types";
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

interface DepartmentTableProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}

const DepartmentsTable = ({
  departments,
  onEdit,
  onDelete,
}: DepartmentTableProps) => {
  const exportToCSV = () => {
    const headers = ["Name", "Manager", "Description"];
    const csvData = departments.map((emp) =>
      [emp.name, emp.manager.fullName, emp.description].join(",")
    );

    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "departments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log({ departments });
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
            <TableHead>Manager</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24 text-muted-foreground"
              >
                No departments found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            departments.map((department, index) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.manager.fullName}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(department)}
                      aria-label={`Edit ${department.name}`}
                    >
                      <PenIcon className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          aria-label={`Delete ${department.name}`}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {department.name}'s
                            record. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(department.id)}
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

export default DepartmentsTable;
