import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LeaveBalance } from "@/components/leave-balance/type";
import {
  useUpdateLeaveBalance,
  useDeleteLeaveBalance,
  useLeaveBalances,
} from "@/hooks/useLeaveBalance";
import LeaveBalanceDialog from "@/components/leave-balance/Dialog";
import LeaveBalanceTable from "@/components/leave-balance/Table";

const LeaveBalancePage = () => {
  const { toast } = useToast();
  const { data: leaveBalances, isLoading } = useLeaveBalances();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLeaveBalance, setCurrentLeaveBalance] =
    useState<LeaveBalance | null>(null);
  const { mutate: updateLeaveBalance } = useUpdateLeaveBalance();
  const { mutate: deleteLeaveBalance } = useDeleteLeaveBalance();

  const handleUpdateLeaveBalance = (leaveBalance: LeaveBalance) => {
    updateLeaveBalance({ ...leaveBalance, id: currentLeaveBalance?.id });
    setIsDialogOpen(false);
    setCurrentLeaveBalance(null);
    toast({
      title: "Success",
      description: "Leave balance updated successfully",
    });
  };
  const handleDeleteLeaveBalance = (id: string) => {
    deleteLeaveBalance(id);
    toast({
      title: "Success",
      description: "Leave balance deleted successfully",
    });
  };

  const handleEditLeaveBalance = (leaveBalance: LeaveBalance) => {
    setCurrentLeaveBalance(leaveBalance);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Leave Balance Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's leave balance records
            </p>
          </div>
        </div>
      </div>

      <LeaveBalanceTable
        leaveBalances={leaveBalances || []}
        onEdit={handleEditLeaveBalance}
        onDelete={handleDeleteLeaveBalance}
      />

      <LeaveBalanceDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setCurrentLeaveBalance(null);
        }}
        onSubmit={handleUpdateLeaveBalance}
        leaveBalance={currentLeaveBalance}
      />
    </div>
  );
};

export default LeaveBalancePage;
