import { Task } from "@domain/entities/task";
import { TaskRepository } from "@domain/repositories/task";

export class TaskRepositoryStub implements TaskRepository {
  create(): Promise<Task> {
    return;
  }

  findById(): Promise<Task | null> {
    return;
  }

  findAll(): Promise<Task[]> {
    return;
  }

  update(): Promise<Task> {
    return;
  }

  delete(): Promise<void> {
    return;
  }
}
