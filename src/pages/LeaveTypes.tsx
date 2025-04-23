import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { LeaveTypeForm } from "@/components/leave-type/LeaveTypeForm";
import { LeaveTypesTable } from "@/components/leave-type/LeaveTypesTable";

export type LeaveType = {
  id: string;
  name: string;
  defaultDays: number;
  accrualRate: number;
  maxCarryForward: number;
};

// Mock data for leave types
const initialLeaveTypes: LeaveType[] = [
  {
    id: "1",
    name: "Annual Leave",
    defaultDays: 20,
    accrualRate: 1.67,
    maxCarryForward: 5,
  },
  {
    id: "2",
    name: "Sick Leave",
    defaultDays: 10,
    accrualRate: 0.83,
    maxCarryForward: 0,
  },
];

export default function LeaveTypes() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(initialLeaveTypes);
  const [editingLeaveType, setEditingLeaveType] = useState<LeaveType | null>(
    null
  );

  const handleSave = (leaveType: Omit<LeaveType, "id">) => {
    if (editingLeaveType) {
      setLeaveTypes((types) =>
        types.map((type) =>
          type.id === editingLeaveType.id ? { ...leaveType, id: type.id } : type
        )
      );
    } else {
      setLeaveTypes((types) => [
        ...types,
        { ...leaveType, id: Math.random().toString() },
      ]);
    }
  };

  const handleDelete = (id: string) => {
    setLeaveTypes((types) => types.filter((type) => type.id !== id));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Types</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Leave Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Leave Type</DialogTitle>
            </DialogHeader>
            <LeaveTypeForm onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>
      <LeaveTypesTable
        leaveTypes={leaveTypes}
        onEdit={setEditingLeaveType}
        onDelete={handleDelete}
      />
      {editingLeaveType && (
        <Dialog
          open={!!editingLeaveType}
          onOpenChange={() => setEditingLeaveType(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Leave Type</DialogTitle>
            </DialogHeader>
            <LeaveTypeForm leaveType={editingLeaveType} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
