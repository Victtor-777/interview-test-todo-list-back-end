import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { UserRole } from "@domain/entities/user";
import { RoleGuard, ROLES_METADATA_KEY } from "@infra/commons/guards/role";

export const RoleDecorator = (roles: UserRole[]): MethodDecorator =>
  applyDecorators(SetMetadata(ROLES_METADATA_KEY, roles), UseGuards(RoleGuard));
