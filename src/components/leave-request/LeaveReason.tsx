import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

type LeaveReasonFieldProps = {
  form: UseFormReturn<
    {
      isHalfDay?: boolean;
      startDate?: Date;
      leaveTypeId?: string;
      endDate?: Date;
      leaveReason?: string;
      supportingDocuments?: File[];
    },
    unknown,
    undefined
  >;
};

export const LeaveReasonField = ({ form }: LeaveReasonFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="leaveReason"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reason for Leave (optional)</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Please provide a reason for your leave request"
              className="resize-none"
              rows={4}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
