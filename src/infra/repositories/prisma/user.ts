import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user";
import { Prisma } from "@infra/config/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: Prisma) {}

  async create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: user
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { cpf }
    });
  }
}
