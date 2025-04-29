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
import UserAvatar from "../ui/UserAvatar";
import { User } from "./types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UsersTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role", "Department"];
    const csvData = users?.map((emp) =>
      [emp.fullName, emp.email, emp.role, emp.department.name].join(",")
    );

    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "users.csv");
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
            <TableHead>Avatar</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24 text-muted-foreground"
              >
                No users found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            users?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>
                  <UserAvatar
                    avatarUrl={user.avatar?.url}
                    name={user.fullName}
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                {user.department ? (
                  <TableCell>{user.department.name}</TableCell>
                ) : (
                  <TableCell>No department</TableCell>
                )}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(user)}
                      aria-label={`Edit ${user.fullName}`}
                    >
                      <PenIcon className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          aria-label={`Delete ${user.fullName}`}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {user.fullName}'s
                            record. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(user.id.toString())}
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

export default UsersTable;
