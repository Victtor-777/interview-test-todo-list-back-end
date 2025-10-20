import { Module } from "@nestjs/common";
import { Prisma } from "@infra/config/prisma";
import { PrismaUserRepository } from "@infra/repositories/prisma/user";
import { UserRepository } from "@domain/repositories/user";
import { UserMapperUseCase } from "@use-cases/mapper/user";
import { PrismaTaskRepository } from "@infra/repositories/prisma/task";
import { TaskRepository } from "@domain/repositories/task";

@Module({
  providers: [
    Prisma,
    UserMapperUseCase,
    {
      useClass: PrismaUserRepository,
      provide: UserRepository
    },
    {
      useClass: PrismaTaskRepository,
      provide: TaskRepository
    }
  ],
  exports: [UserRepository, TaskRepository]
})
export class DatabaseModule {}
