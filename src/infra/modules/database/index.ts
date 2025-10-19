import { Module } from "@nestjs/common";
import { Prisma } from "@infra/config/prisma";
import { PrismaUserRepository } from "@infra/repositories/prisma/user";
import { UserRepository } from "@domain/repositories/user";
import { UserMapperUseCase } from "@use-cases/mapper";

@Module({
  providers: [
    Prisma,
    UserMapperUseCase,
    {
      useClass: PrismaUserRepository,
      provide: UserRepository
    }
  ],
  exports: [UserRepository]
})
export class DatabaseModule {}
