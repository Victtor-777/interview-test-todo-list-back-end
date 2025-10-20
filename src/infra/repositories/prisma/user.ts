import { User } from "@domain/entities/user";
import { CreateUserParams, UserRepository } from "@domain/repositories/user";
import { Prisma } from "@infra/config/prisma";
import { Injectable } from "@nestjs/common";
import { UserMapperUseCase } from "@use-cases/mapper/user";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: Prisma,
    private readonly userMapper: UserMapperUseCase
  ) {}

  async create(params: CreateUserParams): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: params.name,
        email: params.email,
        password: params.password,
        role: params.role
      }
    });

    return this.userMapper.toDomain(createdUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user ? this.userMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    return user ? this.userMapper.toDomain(user) : null;
  }
}
