import { useMsal } from "@azure/msal-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

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

// mutation hook for approove request
export const useApproveLeaveRequest = (comment: string) => {
  return useMutation({
    mutationFn: (requestId: string) => approveLeaveRequest(requestId, comment),
  });
};

// mutation hook for reject request
export const useRejectLeaveRequest = (comment: string) => {
  return useMutation({
    mutationFn: (requestId: string) => rejectLeaveRequest(requestId, comment),
  });
};

export const useLeaveRequests = () => {
  const { accounts } = useMsal();
  return useQuery({
    queryKey: ["leaveRequests"],
    queryFn: () => fetchLeaveRequests(accounts[0]?.username),
  });
};

export const useLeaveRequestsByStatus = (
  status: "Pending" | "Approved" | "Rejected"
) => {
  return useQuery({
    queryKey: ["leaveRequestsByStatus", status],
    queryFn: () => fetchLeaveRequestsByStatus(status),
  });
};
