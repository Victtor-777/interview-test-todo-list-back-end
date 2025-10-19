import { Injectable } from "@nestjs/common";
import { UserRepository } from "@domain/repositories/user";
import { TokenAdapter } from "@domain/adapters/token";
import { User } from "@domain/entities/user";

interface AuthenticatedHeader extends Headers {
  authorization?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
  headers: AuthenticatedHeader;
}

@Injectable()
export class RouteAuthenticationUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenAdapter
  ) {}

  async validate(request: AuthenticatedRequest): Promise<boolean> {
    const bearerToken = request?.headers?.authorization;

    if (!bearerToken) {
      return false;
    }

    const token = bearerToken.split(" ")[1];

    if (!token) {
      return false;
    }

    const payload = await this.tokenService.getPayloadFromToken(token);

    if (!payload) {
      return false;
    }

    const user = await this.userRepository.findById(payload.id);

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}
