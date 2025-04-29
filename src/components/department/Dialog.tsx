import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Department } from "@/components/department/types";
import { useUsersByRole } from "@/hooks/useEmployee";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  managerEmail: z.string().email("Invalid email address"),
  description: z.string().min(1, "Please select a description"),
});

interface DepartmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    department: Department | Omit<typeof formSchema._type, "id">
  ) => void;
  department: Department | null;
}

const DepartmentDialog = ({
  isOpen,
  onClose,
  onSubmit,
  department,
}: DepartmentDialogProps) => {
  const { data: managers } = useUsersByRole("ADMIN");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      managerEmail: "",
      description: "",
    },
  });

  useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
        managerEmail: department.manager.email,
        description: department.description,
      });
    } else {
      form.reset({
        name: "",
        managerEmail: "",
        description: "",
      });
    }
  }, [department, form, isOpen]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "Add New Department"}
          </DialogTitle>
          <DialogDescription>
            {department
              ? "Update the department information below."
              : "Fill out the form below to add a new department."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Department Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="managerEmail"
              control={form.control}
              rules={{ required: "Please select Manager" }}
              defaultValue=""
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="managerEmail">
                    <SelectValue placeholder="Select Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {managers?.map((manager) => (
                        <SelectItem
                          textValue={manager.fullName}
                          key={manager.id}
                          value={manager.email}
                        >
                          {manager.fullName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {department ? "Update" : "Add"} Department
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentDialog;
