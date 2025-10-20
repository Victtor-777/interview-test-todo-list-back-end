import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(userId: string): Promise<Omit<User, "password"> | void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return this.exceptionService.notFound({
        message: "User not found"
      });
    }

    // Remover senha antes de retornar
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
