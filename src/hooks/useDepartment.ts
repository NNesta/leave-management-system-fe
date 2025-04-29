import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Department } from "@/components/department/types";
import { useToast } from "@/components/ui/use-toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllDepartments = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/departments`);
  return data;
};

const fetchDepartment = async (email: string) => {
  const { data } = await axios.get(`${VITE_API_URL}/departments/email`, {
    params: { email },
  });
  return data;
};

const createDepartment = async (department: Omit<Department, "id">) => {
  const { data } = await axios.post(`${VITE_API_URL}/departments`, department);
  return data;
};

const updateDepartment = async (department: Department) => {
  const updatedDate = { ...department };
  delete updatedDate.id;
  const { data } = await axios.put(
    `${VITE_API_URL}/departments/${department.id}`,
    updatedDate
  );
  return data;
};

const deleteDepartment = async (id: string) => {
  const { data } = await axios.delete(`${VITE_API_URL}/departments/${id}`);
  return data;
};

export const useCreateDepartment = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (department: Omit<Department, "id">) =>
      createDepartment(department),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Department created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create department",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useDepartmentByEmail = (email: string) => {
  return useQuery({
    queryKey: ["departments", email],
    queryFn: () => fetchDepartment(email),
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (department: Department) => updateDepartment(department),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Department updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update department",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Department deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete department",
        variant: "destructive",
      });
      console.error(error);
    },
  });
};

export const useDepartment = (id: string) => {
  return useQuery({
    queryKey: ["departments", id],
    queryFn: () => fetchDepartment(id),
  });
};

export const useAllDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchAllDepartments,
  });
};
