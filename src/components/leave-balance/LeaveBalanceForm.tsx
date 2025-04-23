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
import { LeaveBalance } from "@/pages/LeaveBalance";

const formSchema = z.object({
  employeeEmail: z.string().email(),
  takenDays: z.number().min(0),
  totalDays: z.number().min(0),
  leaveTypes: z.array(z.string()).min(1, "At least one leave type is required"),
});

type FormData = Omit<LeaveBalance, "id">;

interface LeaveBalanceFormProps {
  defaultValues?: LeaveBalance;
  onSubmit: (data: FormData) => void;
}

export function LeaveBalanceForm({
  defaultValues,
  onSubmit,
}: LeaveBalanceFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      employeeEmail: "",
      takenDays: 0,
      totalDays: 0,
      leaveTypes: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="employeeEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="takenDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taken Days</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Days</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaveTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave Types (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((type) => type.trim())
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {defaultValues ? "Update" : "Create"} Leave Balance
        </Button>
      </form>
    </Form>
  );
}
