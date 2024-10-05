import { DefaultSession } from "next-auth";

export interface User {
  id: string;
  role: string;
  email: string;
  token: string;
  tenantId: string;
}
