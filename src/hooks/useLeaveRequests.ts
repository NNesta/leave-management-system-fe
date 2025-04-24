import { useMsal } from "@azure/msal-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const fetchLeaveRequests = async (email: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/leaves/employee`, {
    params: { email },
    withCredentials: true,
  });
  return data || [];
};

const fetchLeaveRequestsByStatus = async (
  status: "Pending" | "Approved" | "Rejected"
) => {
  const { data } = await axios.get(`${VITE_API_URL}/leaves/status/${status}`);
  return data || [];
};

// approve request
const approveLeaveRequest = async (requestId: string, comment: string) => {
  const { data } = await axios.put(
    `${VITE_API_URL}/leaves/${requestId}/status`,
    {
      status: "Approved",
      comment,
    }
  );
  return data;
};

const rejectLeaveRequest = async (requestId: string, comment: string) => {
  const { data } = await axios.put(
    `${VITE_API_URL}/leaves/${requestId}/status`,
    {
      status: "Rejected",
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
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to approve leave request",
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
        variant: "destructive",
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
  status: "Pending" | "Approved" | "Rejected"
) => {
  return useQuery({
    queryKey: ["leaveRequests", status],
    queryFn: () => fetchLeaveRequestsByStatus(status),
  });
};
