import { UserRole } from "@prisma/client";
import { BaseEntity } from "./base";

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
