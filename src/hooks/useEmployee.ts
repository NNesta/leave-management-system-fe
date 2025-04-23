import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/components/user/types";
import { useToast } from "@/components/ui/use-toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllUsers = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/employees`);
  return data;
};

const fetchUser = async (email: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/employees/email`, {
    params: { email },
  });
  return data;
};

const createUser = async (user: Omit<User, "id">) => {
  const { data } = await axios.post(`${VITE_API_URL}/employees`, user);
  return data;
};

const updateUser = async (user: User) => {
  const updatedDate = { ...user };
  delete updatedDate.id;
  const { data } = await axios.put(
    `${VITE_API_URL}/employees/${user.id}`,
    updatedDate
  );
  return data;
};

const deleteUser = async (id: string) => {
  const { data } = await axios.delete(`${VITE_API_URL}/employees/${id}`);
  return data;
};

export const useCreateUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: Omit<User, "id">) => createUser(user),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ["users", email],
    queryFn: () => fetchUser(email),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
};
