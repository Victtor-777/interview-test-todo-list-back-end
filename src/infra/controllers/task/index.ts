import { Task } from "@domain/entities/task";
import { AuthDecorator } from "@infra/commons/decorators/auth";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthenticatedRequest } from "@use-cases/authentication/route-authentication";
import { CreateTaskUseCase } from "@use-cases/task/create";
import { CreateTaskDto } from "./dtos/create";
import { CreateTaskResponses } from "@infra/config/swagger/task/create";
import { FindAllTasksUseCase } from "@use-cases/task/find-all";
import { FindTaskByIdUseCase } from "@use-cases/task/find-by-id";
import { UpdateTaskUseCase } from "@use-cases/task/update";
import { DeleteTaskUseCase } from "@use-cases/task/delete";
import { FindAllTasksResponses } from "@infra/config/swagger/task/find-all";
import { UpdateTaskDto } from "./dtos/update";
import { UpdateTaskResponses } from "@infra/config/swagger/task/update";
import { FindTaskByIdResponses } from "@infra/config/swagger/task/find-by-id";
import { DeleteTaskResponses } from "@infra/config/swagger/task/delete";

@ApiTags("Tasks")
@Controller("tasks")
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  @Post()
  @AuthDecorator()
  @CreateTaskResponses
  async createTask(
    @Body() body: CreateTaskDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Task | void> {
    const userId = req.user.id;
    return this.createTaskUseCase.execute({ ...body, userId });
  }

  @Put(":id")
  @AuthDecorator()
  @UpdateTaskResponses
  async updateTask(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: UpdateTaskDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Task | void> {
    return this.updateTaskUseCase.execute(id, body, req.user);
  }

  @Get()
  @AuthDecorator()
  @FindAllTasksResponses
  async findAllTasks(@Req() req: AuthenticatedRequest): Promise<Task[]> {
    return this.findAllTasksUseCase.execute(req.user);
  }

  @Get(":id")
  @AuthDecorator()
  @FindTaskByIdResponses
  async findTaskById(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest
  ): Promise<Task | void> {
    return this.findTaskByIdUseCase.execute(id, req.user);
  }

  @Delete(":id")
  @AuthDecorator()
  @DeleteTaskResponses
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest
  ): Promise<void> {
    return this.deleteTaskUseCase.execute(id, req.user);
  }
}
