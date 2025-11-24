export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "HR" | "EMPLOYEE";
  department?: string;
  position?: string;
}