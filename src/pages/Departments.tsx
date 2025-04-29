import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import DepartmentTable from "@/components/department/Table";
import DepartmentDialog from "@/components/department/Dialog";
import { useToast } from "@/components/ui/use-toast";
import { Department } from "@/components/department/types";
import {
  useAllDepartments,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from "@/hooks/useDepartment";

// Mock initial data for employees

const DepartmentsPage = () => {
  const { toast } = useToast();
  const { data: Departments, isLoading } = useAllDepartments();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Department | null>(
    null
  );
  const { mutate: createDepartment } = useCreateDepartment();
  const { mutate: updateDepartment } = useUpdateDepartment();
  const { mutate: deleteDepartment } = useDeleteDepartment();
  console.log({ Departments });
  // Handler for adding a new department
  const handleAddDepartment = (department: Omit<Department, "id">) => {
    createDepartment(department);
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Employee added successfully",
    });
  };

  // Handler for updating an existing department
  const handleUpdateDepartment = (department: Department) => {
    updateDepartment({ id: currentEmployee!.id, ...department });
    setIsDialogOpen(false);
    setCurrentEmployee(null);
    toast({
      title: "Success",
      description: "Employee updated successfully",
    });
  };

  // Handler for deleting an department
  const handleDeleteEmployee = (id: string) => {
    deleteDepartment(id);
    toast({
      title: "Success",
      description: "Employee deleted successfully",
    });
  };

  // Handler for editing an department
  const handleEditEmployee = (department: Department) => {
    setCurrentEmployee(department);
    setIsDialogOpen(true);
  };

  // Handler for opening the dialog to add a new department
  const handleOpenAddDialog = () => {
    setCurrentEmployee(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Department Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's department records
            </p>
          </div>
          <Button
            onClick={handleOpenAddDialog}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Department
          </Button>
        </div>
      </div>

      <DepartmentTable
        departments={Departments || []}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      <DepartmentDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setCurrentEmployee(null);
        }}
        onSubmit={
          currentEmployee ? handleUpdateDepartment : handleAddDepartment
        }
        department={currentEmployee}
      />
    </div>
  );
};

export default DepartmentsPage;
