export interface Employee {
  id: number;
  fullName: string;
  email: string;
  role: string;
  department: string;
}

export interface LeaveType {
  id: number;
  name: string;
  defaultDays: number;
  isPaid: boolean | null;
  defaultAccrualRate: number;
  maxCarryForward: number;
}

export interface SupportingDocument {
  id: number;
  url: string;
  fileName: string;
  fileType: string;
  uploadedDate: number[];
}

export interface LeaveRequest {
  id: number;
  user: Employee;
  leaveType: LeaveType;
  reason: string;
  status: string;
  comment: string | null;
  dateCreated: number[] | null;
  startDate: number[] | null;
  endDate: number[] | null;
  daysNumber: number | null;
  supportingDocuments: SupportingDocument[];
  isHalfDay: boolean;
}
