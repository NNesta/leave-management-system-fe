interface Employee {
  fullName: string;
  avatar: string;
  position: string;
  email?: string;
  department?: string;
}

export interface LeaveRequest {
  id: string;
  employee: Employee;
  type: string;
  startDate: string;
  endDate: string;
  leaveDays: number;
  leaveReason: string;
  status: string;
  leaveType: {
    name: string;
  };
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
