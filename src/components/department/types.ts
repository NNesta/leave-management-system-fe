import { User } from "../user/types";

export interface Department {
  id: string;
  name: string;
  manager: User;
  description?: string;
}
