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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
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
import { LeaveType } from "./type";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  defaultDays: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive({ message: "Must be greater than 0" })
  ),
  defaultAccrualRate: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive({ message: "Must be greater than 0" })
  ),
  maxCarryForward: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive({ message: "Must be greater than 0" })
  ),
});

interface LeaveTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    leaveType: LeaveType | Omit<typeof formSchema._type, "id">
  ) => void;
  leaveType: LeaveType | null;
}

const LeaveTypeDialog = ({
  isOpen,
  onClose,
  onSubmit,
  leaveType,
}: LeaveTypeDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      defaultDays: 0,
      defaultAccrualRate: 0,
      maxCarryForward: 0,
    },
  });

  useEffect(() => {
    if (leaveType) {
      form.reset({
        name: leaveType.name,
        defaultDays: leaveType.defaultDays,
        defaultAccrualRate: leaveType.defaultAccrualRate,
        maxCarryForward: leaveType.maxCarryForward,
      });
    } else {
      form.reset({
        name: "",
        defaultDays: 0,
        defaultAccrualRate: 0,
        maxCarryForward: 0,
      });
    }
  }, [leaveType, form, isOpen]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {leaveType ? "Edit Leave Type" : "Add New Leave Type"}
          </DialogTitle>
          <DialogDescription>
            {leaveType
              ? "Update the leave type information below."
              : "Fill out the form below to add a new leave type."}
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
                    <Input type="text" placeholder="Leave Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Days</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultAccrualRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Accrual Rate</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxCarryForward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Carry Forward</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
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
                {leaveType ? "Update" : "Add"} Leave Type
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveTypeDialog;
