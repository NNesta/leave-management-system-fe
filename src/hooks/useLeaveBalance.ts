import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LeaveBalance } from "@/components/leave-balance/type";
import { toast } from "./use-toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchLeaveBalanceByEmail = async (email: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/leave-balance/user`, {
    params: { email },
    withCredentials: true,
  });
  return data || [];
};

const updateLeaveBalance = async (leaveBalance: LeaveBalance) => {
  const { data } = await axios.put(
    `${VITE_API_URL}/leave-balance/${leaveBalance.id}`,
    {
      totalDays: leaveBalance.totalDays,
      takenDays: leaveBalance.takenDays,
    }
  );
  return data;
};

const deleteLeaveBalance = async (id: string) => {
  const { data } = await axios.delete(`${VITE_API_URL}/leave-balance/${id}`);
  return data;
};

const fetchLeaveBalances = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/leave-balance`);
  return data;
};

export const useLeaveBalanceByEmail = (email: string) => {
  return useQuery({
    queryKey: ["leaveBalance", email],
    queryFn: () => fetchLeaveBalanceByEmail(email),
  });
};

export const useUpdateLeaveBalance = () => {
  const queryClient = useQueryClient();
  return {
    mutate: updateLeaveBalance,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Leave balance updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["leaveBalance"],
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update leave balance",
        variant: "destructive",
      });
      console.error(error);
    },
  };
};

export const useDeleteLeaveBalance = () => {
  const queryClient = useQueryClient();
  return {
    mutate: deleteLeaveBalance,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Leave balance deleted successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["leaveBalance"],
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete leave balance",
        variant: "destructive",
      });
      console.error(error);
    },
  };
};

export const useLeaveBalances = () => {
  return useQuery({
    queryKey: ["leaveBalance"],
    queryFn: fetchLeaveBalances,
  });
};
export const useLeaveBalancesByEmail = (email: string) => {
  return useQuery({
    queryKey: ["leaveBalance", email],
    queryFn: () => fetchLeaveBalanceByEmail(email),
  });
};
