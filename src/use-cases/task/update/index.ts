import { Injectable } from "@nestjs/common";
import { TaskRepository, UpdateTaskParams } from "@domain/repositories/task";
import { Task } from "@domain/entities/task";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { User, UserRole } from "@domain/entities/user";

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly exceptionsService: ExceptionsAdapter
  ) {}

  async execute(
    id: string,
    params: UpdateTaskParams,
    user: User
  ): Promise<Task | void> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      return this.exceptionsService.notFound({ message: "Task not found" });
    }

    if (user.role !== UserRole.ADMIN && task.userId !== user.id) {
      return this.exceptionsService.forbidden({
        message: "You can only update your own tasks"
      });
    }

    if (params.isCompleted && !task.isCompleted) {
      params.completedAt = new Date();
    }

    if (params.isCompleted === false) {
      params.completedAt = null;
    }

    return this.taskRepository.update(id, params);
  }
}
