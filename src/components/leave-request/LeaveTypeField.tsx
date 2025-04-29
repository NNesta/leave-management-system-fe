import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeaveType } from "@/types/leaves";
import { UseFormReturn } from "react-hook-form";

type LeaveTypeFieldProps = {
  form: UseFormReturn<
    {
      isHalfDay?: boolean;
      startDate?: Date;
      endDate?: Date;
      leaveTypeId?: string;
      leaveReason?: string;
      supportingDocuments?: File[];
    },
    unknown,
    undefined
  >;
  leaveTypes: LeaveType[];
};

export const LeaveTypeField = ({ form, leaveTypes }: LeaveTypeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="leaveTypeId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Leave Type</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {leaveTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
