import { User } from "@/components/user/types";
import { LeaveType } from "@/components/calendar/types";

export interface LeaveBalance {
  id: string;
  employee: User;
  leaveType: LeaveType;
  totalDays: number;
  takenDays: number;
}
