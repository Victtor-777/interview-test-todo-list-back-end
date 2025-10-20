import { Injectable } from "@nestjs/common";
import { User as PrismaUser } from "@prisma/client";
import {
  User as DomainUser,
  UserRole as DomainUserRole
} from "@domain/entities/user";

@Injectable()
export class UserMapperUseCase {
  toDomain(prismaUser: PrismaUser): DomainUser {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      role: prismaUser.role as DomainUserRole,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt
    };
  }
}
