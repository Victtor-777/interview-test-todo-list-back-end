import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { User, UserRole } from "@domain/entities/user";
import { TaskRepository } from "@domain/repositories/task";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly exceptionsService: ExceptionsAdapter
  ) {}

  async execute(id: string, user: User): Promise<void> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      this.exceptionsService.notFound({ message: "Task not found" });
    }

    if (user.role !== UserRole.ADMIN && task.userId !== user.id) {
      this.exceptionsService.forbidden({
        message: "You do not have permission to delete this task"
      });
    }

    return await this.taskRepository.delete(id);
  }
}
