import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { LeaveType } from "@/pages/LeaveTypes";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  defaultDays: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(365, "Cannot exceed 365 days"),
  accrualRate: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(30, "Cannot exceed 30 days per month"),
  maxCarryForward: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(365, "Cannot exceed 365 days"),
});

type FormData = z.infer<typeof formSchema>;

interface LeaveTypeFormProps {
  leaveType?: LeaveType;
  onSave: (data: FormData) => void;
}

export function LeaveTypeForm({ leaveType, onSave }: LeaveTypeFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      defaultDays: 0,
      accrualRate: 0,
      maxCarryForward: 0,
    },
  });

  useEffect(() => {
    if (leaveType) {
      form.reset(leaveType);
    }
  }, [leaveType, form]);

  const onSubmit = (data: FormData) => {
    onSave(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Annual Leave" {...field} />
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
              <FormLabel>Default Days</FormLabel>
              <FormControl>
                <Input type="number" placeholder="20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accrualRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Accrual Rate (days per month)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="1.67"
                  {...field}
                />
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
              <FormLabel>Maximum Carry Forward Days</FormLabel>
              <FormControl>
                <Input type="number" placeholder="5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Leave Type
        </Button>
      </form>
    </Form>
  );
}
