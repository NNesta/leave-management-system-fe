import { User } from "@/components/user/types";
import { LeaveType } from "@/components/calendar/types";

export interface LeaveBalance {
  id: string;
  user: User;
  leaveType: LeaveType;
  totalDays: number;
  takenDays: number;
}
