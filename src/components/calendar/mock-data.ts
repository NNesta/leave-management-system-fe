import { PublicHoliday } from "./types";

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9);

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
