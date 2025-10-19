import { User } from "@domain/entities/user";
import { UserRole } from "@prisma/client";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export abstract class UserRepository {
  abstract create(user: CreateUserParams): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
