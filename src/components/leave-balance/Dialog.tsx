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
import { LeaveBalance } from "./type";

const formSchema = z.object({
  totalDays: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive({ message: "Must be greater than 0" })
  ),
  takenDays: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive({ message: "Must be greater than 0" })
  ),
});

interface LeaveBalanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    leaveBalance: LeaveBalance | Omit<typeof formSchema._type, "id">
  ) => void;
  leaveBalance: LeaveBalance | null;
}

const LeaveBalanceDialog = ({
  isOpen,
  onClose,
  onSubmit,
  leaveBalance,
}: LeaveBalanceDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalDays: 0,
      takenDays: 0,
    },
  });

  useEffect(() => {
    if (leaveBalance) {
      form.reset({
        totalDays: leaveBalance.totalDays,
        takenDays: leaveBalance.takenDays,
      });
    } else {
      form.reset({
        totalDays: 0,
        takenDays: 0,
      });
    }
  }, [leaveBalance, form, isOpen]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {leaveBalance ? "Edit Leave Balance" : "Add New Leave Balance"}
          </DialogTitle>
          <DialogDescription>
            {leaveBalance
              ? "Update the leave balance information below."
              : "Fill out the form below to add a new leave balance."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="totalDays"
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
              name="takenDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days Taken</FormLabel>
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
                {leaveBalance ? "Update" : "Add"} Leave Balance
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveBalanceDialog;
