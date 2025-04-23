import { User } from "@/components/user/types";

export interface LeaveType {
  id: string;
  name: string;
  defaultDays: number;
  defaultAccrualRate: number;
  maxCarryForward: number;
}
