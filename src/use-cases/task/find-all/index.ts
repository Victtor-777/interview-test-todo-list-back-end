import { Task } from "@domain/entities/task";
import { User, UserRole } from "@domain/entities/user";
import { TaskRepository } from "@domain/repositories/task";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(user: User): Promise<Task[]> {
    const userId = user.role === UserRole.ADMIN ? undefined : user.id;

    return this.taskRepository.findAll(userId);
  }
}
