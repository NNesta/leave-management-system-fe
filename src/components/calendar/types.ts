import { User } from "../user/types";

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: string;
  isHalfDay?: boolean;
  department?: Department;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "pending" | "approved" | "rejected";
  color?: string;
}

export interface PublicHoliday {
  id: string;
  name: string;
  date: Date;
  country: string;
}

export interface Department {
  id: string;
  name: string;
  manager: User;
  description: string;
}

export interface LeaveType {
  id: string;
  name: string;
  color: string;
}

export type CalendarViewMode = "month" | "week" | "day";

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  holidays: PublicHoliday[];
}
