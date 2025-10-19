import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from "@nestjs/common";
import {
  AuthenticatedRequest,
  RouteAuthenticationUseCase
} from "@use-cases/authentication/route-authentication";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly routeAuthenticationUseCase: RouteAuthenticationUseCase
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const isValid = await this.routeAuthenticationUseCase.validate(request);

    if (!isValid) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    return true;
  }
}
