import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TokenAdapter, TokenPayload } from "@domain/adapters/token";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";

export type LoginUseCaseReturn = Promise<{ accessToken: string } | void>;

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyAdapter: CryptographyAdapter,
    private readonly tokenService: TokenAdapter,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async login(email: string, password: string): LoginUseCaseReturn {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return this.exceptionService.unauthorized({
        message: "Invalid credentials"
      });
    }

    const isPasswordValid = await this.cryptographyAdapter.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return this.exceptionService.unauthorized({
        message: "Invalid credentials"
      });
    }

    const payload: TokenPayload = { id: user.id };
    const accessToken = await this.tokenService.generateToken(payload);

    return {
      accessToken
    };
  }
}
