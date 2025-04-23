import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LeaveType } from "@/components/leave-type/type";
import {
  useAllLeaveTypes,
  useCreateLeaveType,
  useUpdateLeaveType,
  useDeleteLeaveType,
} from "@/hooks/useLeaveType";
import LeaveTypeDialog from "@/components/leave-type/Dialog";
import LeaveTypeTable from "@/components/leave-type/Table";

const LeaveTypesPage = () => {
  const { toast } = useToast();
  const { data: leaveTypes } = useAllLeaveTypes();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLeaveType, setCurrentLeaveType] = useState<LeaveType | null>(
    null
  );
  const { mutate: createLeaveType } = useCreateLeaveType();
  const { mutate: updateLeaveType } = useUpdateLeaveType();
  const { mutate: deleteLeaveType } = useDeleteLeaveType();

  const handleUpdateLeaveType = (leaveType: LeaveType) => {
    updateLeaveType({ ...leaveType, id: currentLeaveType?.id });
    setIsDialogOpen(false);
    setCurrentLeaveType(null);
    toast({
      title: "Success",
      description: "Leave type updated successfully",
    });
  };

  const handleAddLeaveType = (leaveType: LeaveType) => {
    createLeaveType(leaveType);
    setIsDialogOpen(false);
    setCurrentLeaveType(null);
    toast({
      title: "Success",
      description: "Leave type added successfully",
    });
  };
  const handleDeleteLeaveType = (id: string) => {
    deleteLeaveType(id);
    toast({
      title: "Success",
      description: "Leave type deleted successfully",
    });
  };

  const handleEditLeaveType = (leaveType: LeaveType) => {
    setCurrentLeaveType(leaveType);
    setIsDialogOpen(true);
  };

  const handleOpenAddDialog = () => {
    setCurrentLeaveType(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Leave Type Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's leave type records
            </p>
          </div>
          <Button
            onClick={handleOpenAddDialog}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Leave Type
          </Button>
        </div>
      </div>

      <LeaveTypeTable
        leaveTypes={leaveTypes || []}
        onEdit={handleEditLeaveType}
        onDelete={handleDeleteLeaveType}
      />

      <LeaveTypeDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setCurrentLeaveType(null);
        }}
        onSubmit={currentLeaveType ? handleUpdateLeaveType : handleAddLeaveType}
        leaveType={currentLeaveType}
      />
    </div>
  );
};

export default LeaveTypesPage;
