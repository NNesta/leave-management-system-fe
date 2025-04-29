import { LeaveType } from "../leave-type/type";
import { User } from "../user/types";

export interface LeaveRequest {
  id: string;
  user: User;
  type: string;
  startDate: number[];
  endDate: number[];
  leaveDays: number;
  reason: string;
  daysNumber: number;
  status: string;
  leaveType: LeaveType;
  isHalfDay?: boolean;
  color?: string;
  supportingDocuments?: Document[];
}

export interface Document {
  id: string;
  fileName: string;
  fileType: "image" | "pdf" | "doc" | "video" | "other";
  url: string;
}

export interface ApprovedRequest extends LeaveRequest {
  approvedBy: string;
  approvedOn: string;
}
