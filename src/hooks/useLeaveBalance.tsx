import { useMsal } from "@azure/msal-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchLeaveBalances = async (email: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/leave-balance/employee`, {
    params: { email },
    withCredentials: true,
  });
  return data;
};

export const useLeaveBalances = () => {
  const { accounts } = useMsal();
  return useQuery({
    queryKey: ["leaveBalances"],
    queryFn: () => fetchLeaveBalances(accounts[0]?.username),
  });
};
