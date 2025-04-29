import { addDays, subDays } from "date-fns";
import { CalendarEvent, Department, LeaveType, PublicHoliday } from "./types";

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Current date for relative calculations
const today = new Date();

export const DEPARTMENTS: Department[] = [
  { id: "all", name: "All Departments" },
  { id: "engineering", name: "Engineering" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "hr", name: "Human Resources" },
  { id: "finance", name: "Finance" },
];

export const LEAVE_TYPES: LeaveType[] = [
  { id: "all", name: "All Types", color: "#64748b" },
  { id: "annual", name: "Annual Leave", color: "#8b5cf6" },
  { id: "sick", name: "Sick Leave", color: "#ef4444" },
  { id: "personal", name: "Personal Leave", color: "#f97316" },
  { id: "parental", name: "Parental Leave", color: "#10b981" },
  { id: "bereavement", name: "Bereavement Leave", color: "#6366f1" },
];

// Rwanda public holidays for 2025
export const PUBLIC_HOLIDAYS: PublicHoliday[] = [
  {
    id: generateId(),
    name: "New Year's Day",
    date: new Date(2025, 0, 1),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "Heroes' Day",
    date: new Date(2025, 0, 1),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "National Mourning Day",
    date: new Date(2025, 3, 7),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "Labor Day",
    date: new Date(2025, 4, 1),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "Liberation Day",
    date: new Date(2025, 6, 4),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "Umuganura Day",
    date: new Date(2025, 7, 2),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "Assumption Day",
    date: new Date(2025, 7, 15),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "Christmas Day",
    date: new Date(2025, 11, 25),
    country: "Rwanda",
  },
  {
    id: generateId(),
    name: "Boxing Day",
    date: new Date(2025, 11, 26),
    country: "Rwanda",
  },
];

// Sample user data
const employees = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=john.smith",
    department: "engineering",
  },
  {
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?u=emma.johnson",
    department: "design",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://i.pravatar.cc/150?u=michael.brown",
    department: "marketing",
  },
  {
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    avatar: "https://i.pravatar.cc/150?u=sophia.davis",
    department: "hr",
  },
  {
    name: "William Wilson",
    email: "william.wilson@example.com",
    avatar: "https://i.pravatar.cc/150?u=william.wilson",
    department: "finance",
  },
];

// Generate sample leave events
export const LEAVE_EVENTS: CalendarEvent[] = [
  // Current month events
  {
    id: generateId(),
    title: "Annual Leave",
    startDate: subDays(today, 2),
    endDate: addDays(today, 3),
    type: "annual",
    user: employees[0],
    department: "engineering",
    status: "approved",
    color: LEAVE_TYPES[1].color,
  },
  {
    id: generateId(),
    title: "Sick Leave",
    startDate: addDays(today, 5),
    endDate: addDays(today, 5),
    type: "sick",
    isHalfDay: true,
    user: employees[1],
    department: "design",
    status: "approved",
    color: LEAVE_TYPES[2].color,
  },
  {
    id: generateId(),
    title: "Personal Leave",
    startDate: addDays(today, 10),
    endDate: addDays(today, 12),
    type: "personal",
    user: employees[2],
    department: "marketing",
    status: "pending",
    color: LEAVE_TYPES[3].color,
  },
  {
    id: generateId(),
    title: "Parental Leave",
    startDate: addDays(today, 15),
    endDate: addDays(today, 45),
    type: "parental",
    user: employees[3],
    department: "hr",
    status: "approved",
    color: LEAVE_TYPES[4].color,
  },
  {
    id: generateId(),
    title: "Bereavement Leave",
    startDate: addDays(today, 7),
    endDate: addDays(today, 11),
    type: "bereavement",
    user: employees[4],
    department: "finance",
    status: "approved",
    color: LEAVE_TYPES[5].color,
  },
  // Add more events
  {
    id: generateId(),
    title: "Annual Leave",
    startDate: addDays(today, 20),
    endDate: addDays(today, 25),
    type: "annual",
    user: employees[0],
    department: "engineering",
    status: "pending",
    color: LEAVE_TYPES[1].color,
  },
  {
    id: generateId(),
    title: "Sick Leave",
    startDate: subDays(today, 5),
    endDate: subDays(today, 5),
    type: "sick",
    isHalfDay: true,
    user: employees[2],
    department: "marketing",
    status: "approved",
    color: LEAVE_TYPES[2].color,
  },
];
