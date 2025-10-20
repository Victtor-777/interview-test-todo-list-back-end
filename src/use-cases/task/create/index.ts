import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { Task } from "@domain/entities/task";
import { CreateTaskParams, TaskRepository } from "@domain/repositories/task";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(params: CreateTaskParams): Promise<Task> {
    if (!params.title || params.title.trim() === "") {
      this.exceptionService.badRequest({
        message: "Title is required"
      });
    }

    if (!params.userId || params.userId.trim() === "") {
      this.exceptionService.badRequest({
        message: "User ID is required"
      });
    }

    return this.taskRepository.create(params);
  }
}
