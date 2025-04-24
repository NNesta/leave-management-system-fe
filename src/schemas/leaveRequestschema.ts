import * as z from "zod";

export const leaveRequestSchema = z
  .object({
    leaveType: z.string({
      required_error: "Leave type is required",
    }),
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date().optional(),
    isHalfDay: z.boolean().default(false),
    leaveReason: z
      .string({
        required_error: "Reason is required",
      })
      .min(1, "Reason is required"),
    supportingDocuments: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      // If it's not a half day, end date is required
      if (!data.isHalfDay && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required for full day leave requests",
      path: ["endDate"],
    }
  );

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;
