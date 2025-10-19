import { BaseEntity } from "./base";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
