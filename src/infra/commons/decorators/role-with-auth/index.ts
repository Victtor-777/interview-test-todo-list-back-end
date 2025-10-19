import { applyDecorators } from "@nestjs/common";
import { UserRole } from "@domain/entities/user";
import { AuthDecorator } from "../auth";
import { RoleDecorator } from "../role";

export const AuthWithRoleDecorator = (roles: UserRole[]): MethodDecorator =>
  applyDecorators(AuthDecorator(), RoleDecorator(roles));
