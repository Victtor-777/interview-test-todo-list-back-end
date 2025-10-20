import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { Task } from "@domain/entities/task";
import { User, UserRole } from "@domain/entities/user";
import { TaskRepository } from "@domain/repositories/task";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindTaskByIdUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      this.exceptionService.notFound({
        message: "Task not found"
      });
    }

    if (user.role !== UserRole.ADMIN && task.userId !== user.id) {
      this.exceptionService.forbidden({
        message: "You do not have permission to access this task"
      });
    }

    return task;
  }
}
