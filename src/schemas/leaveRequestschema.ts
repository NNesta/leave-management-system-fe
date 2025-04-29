import { z } from "zod";

// Helper function to check if a date is after today
const isAfterToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export const leaveFormSchema = z
  .object({
    leaveTypeId: z
      .string({
        required_error: "Leave type is required",
      })
      .nullable(),
    isHalfDay: z.boolean().default(false),
    startDate: z
      .date({
        required_error: "Start date is required",
      })
      .refine(isAfterToday, {
        message: "Start date must be today or after",
      }),
    endDate: z
      .date({
        required_error: "End date is required",
      })
      .refine(isAfterToday, {
        message: "End date must be today or after",
      })
      .nullable(),
    leaveReason: z.string().optional(),
    supportingDocuments: z.array(z.instanceof(File)).default([]).optional(),
  })
  .refine(
    (data) => {
      // If it's a half day request, we don't need to compare start and end dates
      if (data.isHalfDay) return true;

      // If end date is provided, ensure it's after or equal to start date
      if (data.endDate && data.startDate) {
        return data.endDate >= data.startDate;
      }

      return true;
    },
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"],
    }
  );

export type LeaveFormValues = z.infer<typeof leaveFormSchema>;
