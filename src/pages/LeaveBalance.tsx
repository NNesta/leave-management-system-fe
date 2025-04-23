import { useState } from "react";
import { LeaveBalanceTable } from "@/components/leave-balance/LeaveBalanceTable";
import { LeaveBalanceForm } from "@/components/leave-balance/LeaveBalanceForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface LeaveBalance {
  id: string;
  employeeEmail: string;
  takenDays: number;
  totalDays: number;
  leaveTypes: string[];
}

// Mock data for initial development
const initialLeaveBalances: LeaveBalance[] = [
  {
    id: "1",
    employeeEmail: "john.doe@example.com",
    takenDays: 5,
    totalDays: 20,
    leaveTypes: ["Annual Leave", "Sick Leave"],
  },
  {
    id: "2",
    employeeEmail: "jane.smith@example.com",
    takenDays: 3,
    totalDays: 15,
    leaveTypes: ["Annual Leave"],
  },
];

export default function LeaveBalance() {
  const [leaveBalances, setLeaveBalances] =
    useState<LeaveBalance[]>(initialLeaveBalances);
  const [editingBalance, setEditingBalance] = useState<LeaveBalance | null>(
    null
  );

  const handleSubmit = (data: Omit<LeaveBalance, "id">) => {
    if (editingBalance) {
      setLeaveBalances((balances) =>
        balances.map((balance) =>
          balance.id === editingBalance.id
            ? { ...data, id: balance.id }
            : balance
        )
      );
      setEditingBalance(null);
    } else {
      setLeaveBalances((balances) => [
        ...balances,
        { ...data, id: crypto.randomUUID() },
      ]);
    }
  };

  const handleDelete = (id: string) => {
    setLeaveBalances((balances) =>
      balances.filter((balance) => balance.id !== id)
    );
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leave Balances</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Leave Balance</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBalance ? "Edit Leave Balance" : "Add Leave Balance"}
              </DialogTitle>
            </DialogHeader>
            <LeaveBalanceForm
              defaultValues={editingBalance ?? undefined}
              onSubmit={handleSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>
      <LeaveBalanceTable
        leaveBalances={leaveBalances}
        onEdit={setEditingBalance}
        onDelete={handleDelete}
      />
    </div>
  );
}
