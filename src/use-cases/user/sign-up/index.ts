import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { User } from "@domain/entities/user";
import { CreateUserParams, UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";
import { UserRole } from "@prisma/client";

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyService: CryptographyAdapter,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async signUp(
    user: CreateUserParams,
    confirmPassword: string
  ): Promise<User | void> {
    if (user.password !== confirmPassword) {
      return this.exceptionService.badRequest({
        message: "Passwords do not match"
      });
    }

    const existingUserByEmail = await this.userRepository.findByEmail(
      user.email
    );
    if (existingUserByEmail) {
      return this.exceptionService.badRequest({
        message: "Email already registered"
      });
    }

    const hashedPassword = await this.cryptographyService.generateHash(
      user.password
    );

    return this.userRepository.create({
      ...user,
      role: user.role || UserRole.USER,
      password: hashedPassword
    });
  }
}
