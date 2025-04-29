import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";

type HalfDaySwitchProps = {
  form: UseFormReturn<
    {
      leaveTypeId?: string;
      isHalfDay?: boolean;
      startDate?: Date;
      endDate?: Date;
      leaveReason?: string;
      supportingDocuments?: File[];
    },
    unknown,
    undefined
  >;
};

export const HalfDaySwitch = ({ form }: HalfDaySwitchProps) => {
  return (
    <FormField
      control={form.control}
      name="isHalfDay"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between space-y-0 pt-6">
          <FormLabel>Half Day Request</FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
