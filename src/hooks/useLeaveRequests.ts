import { useMsal } from "@azure/msal-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const fetchLeaveRequests = async (email: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/leaves/user`, {
    params: { email },
    withCredentials: true,
  });
  return data || [];
};

const fetchLeaveRequestsByStatus = async (
  status: "PENDING" | "APPROVED" | "REJECTED"
) => {
  const { data } = await axios.get(`${VITE_API_URL}/leaves/status/${status}`);
  return data || [];
};

// approve request
const approveLeaveRequest = async (requestId: string, comment: string) => {
  const { data } = await axios.put(
    `${VITE_API_URL}/leaves/${requestId}/status`,
    {
      status: "APPROVED",
      comment,
    }
  );
  return data;
};

const rejectLeaveRequest = async (requestId: string, comment: string) => {
  const { data } = await axios.put(
    `${VITE_API_URL}/leaves/${requestId}/status`,
    {
      status: "REJECTED",
      comment,
    }
  );
  return data;
};

// get leave request by id
const fetchLeaveRequest = async (requestId: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/leaves/${requestId}`);
  return data;
};

// mutation hook for approove request
export const useApproveLeaveRequest = (comment: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) => approveLeaveRequest(requestId, comment),
    onSuccess: () => {
      toast({
        title: "Leave request approved",
        description: "The leave request has been approved.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["leaveRequests", "LeaveRequest"],
      });
    },
    onError: (error: ErrorType) => {
      console.log({ error }, "______++++");
      const data = error.response?.data;
      toast({
        title: data?.title || "Error",
        description: data?.message || "Failed to approve leave request",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

// mutation hook for reject request
export const useRejectLeaveRequest = (comment: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) => rejectLeaveRequest(requestId, comment),
    onSuccess: () => {
      toast({
        title: "Leave request rejected",
        description: "The leave request has been rejected.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["leaveRequests", "LeaveRequest"],
      });
    },
  });
};

export const useLeaveRequests = () => {
  const { accounts } = useMsal();
  return useQuery({
    queryKey: ["leaveRequests"],
    queryFn: () => fetchLeaveRequests(accounts[0]?.username),
  });
};

// get leave request by id
export const useLeaveRequestById = (requestId: string) => {
  return useQuery({
    queryKey: ["leaveRequest", requestId],
    queryFn: () => fetchLeaveRequest(requestId),
  });
};

export const useLeaveRequestsByStatus = (
  status: "PENDING" | "APPROVED" | "REJECTED"
) => {
  return useQuery({
    queryKey: ["leaveRequests", status],
    queryFn: () => fetchLeaveRequestsByStatus(status),
  });
};
