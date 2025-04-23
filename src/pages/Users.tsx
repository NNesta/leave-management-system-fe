import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import EmployeeTable from "@/components/user/Table";
import EmployeeDialog from "@/components/user/Dialog";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/components/user/types";
import {
  useAllUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/useEmployee";

// Mock initial data for employees

const UsersPage = () => {
  const { toast } = useToast();
  const { data: users, isLoading } = useAllUsers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<User | null>(null);
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  // Handler for adding a new employee
  const handleAddEmployee = (employee: Omit<User, "id">) => {
    createUser(employee);
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Employee added successfully",
    });
  };

  // Handler for updating an existing employee
  const handleUpdateEmployee = (employee: User) => {
    updateUser({ id: currentEmployee!.id, ...employee });
    setIsDialogOpen(false);
    setCurrentEmployee(null);
    toast({
      title: "Success",
      description: "Employee updated successfully",
    });
  };

  // Handler for deleting an employee
  const handleDeleteEmployee = (id: string) => {
    deleteUser(id);
    toast({
      title: "Success",
      description: "Employee deleted successfully",
    });
  };

  // Handler for editing an employee
  const handleEditEmployee = (employee: User) => {
    setCurrentEmployee(employee);
    setIsDialogOpen(true);
  };

  // Handler for opening the dialog to add a new employee
  const handleOpenAddDialog = () => {
    setCurrentEmployee(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's employee records
            </p>
          </div>
          <Button
            onClick={handleOpenAddDialog}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <EmployeeTable
        users={users || []}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      <EmployeeDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setCurrentEmployee(null);
        }}
        onSubmit={currentEmployee ? handleUpdateEmployee : handleAddEmployee}
        user={currentEmployee}
      />
    </div>
  );
};

export default UsersPage;
