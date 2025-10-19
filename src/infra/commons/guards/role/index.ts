import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "@domain/entities/user";
import { RoleValidatorUseCase } from "@use-cases/authentication/role-validator";
import { AuthenticatedRequest } from "@use-cases/authentication/route-authentication";

export const ROLES_METADATA_KEY = "roles";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleValidatorUseCase: RoleValidatorUseCase
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const roles = this.reflector.get<UserRole[]>(
      ROLES_METADATA_KEY,
      context.getHandler()
    );

    if (!roles || roles.length === 0) {
      return true;
    }

    const isValid = this.roleValidatorUseCase.validate(roles, request.user);

    if (!isValid) {
      throw new ForbiddenException("Insufficient permissions");
    }

    return true;
  }
}
