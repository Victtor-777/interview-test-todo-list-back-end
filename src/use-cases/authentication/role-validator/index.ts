import { Injectable } from "@nestjs/common";
import { User, UserRole } from "@domain/entities/user";

@Injectable()
export class RoleValidatorUseCase {
  validate(roles: UserRole[], user?: User): boolean {
    if (!user) {
      return false;
    }

    const isRoleValid = roles.includes(user.role);

    return isRoleValid;
  }
}
