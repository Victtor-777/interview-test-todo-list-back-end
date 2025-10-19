import { BaseEntity } from "./base";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
