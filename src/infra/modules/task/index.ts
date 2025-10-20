import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionsModule } from "../exceptions";
import { TaskController } from "@infra/controllers/task";
import { CreateTaskUseCase } from "@use-cases/task/create";
import { FindTaskByIdUseCase } from "@use-cases/task/find-by-id";
import { FindAllTasksUseCase } from "@use-cases/task/find-all";
import { DeleteTaskUseCase } from "@use-cases/task/delete";
import { UpdateTaskUseCase } from "@use-cases/task/update";
import { AuthenticationModule } from "../authentication";

@Module({
  imports: [DatabaseModule, AuthenticationModule, ExceptionsModule],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    UpdateTaskUseCase,
    FindTaskByIdUseCase,
    FindAllTasksUseCase,
    DeleteTaskUseCase
  ]
})
export class TaskModule {}
