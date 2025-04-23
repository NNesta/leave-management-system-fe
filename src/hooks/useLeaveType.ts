import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LeaveType } from "@/components/leave-type/type";
import { useToast } from "@/components/ui/use-toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllLeaveTypes = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/leave-types`);
  return data;
};

const fetchLeaveType = async (id: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/leave-types/${id}`);
  return data;
};

const createLeaveType = async (leaveType: Omit<LeaveType, "id">) => {
  const { data } = await axios.post(`${VITE_API_URL}/leave-types`, leaveType);
  return data;
};

const updateLeaveType = async (leaveType: LeaveType) => {
  const updatedDate = { ...leaveType };
  delete updatedDate.id;
  const { data } = await axios.put(
    `${VITE_API_URL}/leave-types/${leaveType.id}`,
    updatedDate
  );
  return data;
};

const deleteLeaveType = async (id: string) => {
  const { data } = await axios.delete(`${VITE_API_URL}/leave-types/${id}`);
  return data;
};

export const useCreateLeaveType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (leaveType: Omit<LeaveType, "id">) =>
      createLeaveType(leaveType),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Leave type created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["leaveTypes"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create leave type",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useLeaveTypeById = (id: string) => {
  return useQuery({
    queryKey: ["leaveTypes", id],
    queryFn: () => fetchLeaveType(id),
  });
};

export const useUpdateLeaveType = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (leaveType: LeaveType) => updateLeaveType(leaveType),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Leave type updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["leaveTypes"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update leave type",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useDeleteLeaveType = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteLeaveType(id),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Leave type deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["leaveTypes"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete leave type",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useLeaveType = (id: string) => {
  return useQuery({
    queryKey: ["leaveTypes", id],
    queryFn: () => fetchLeaveType(id),
  });
};

export const useAllLeaveTypes = () => {
  return useQuery({
    queryKey: ["leaveTypes"],
    queryFn: fetchAllLeaveTypes,
  });
};
