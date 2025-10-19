import { Task } from "@domain/entities/task";

export interface CreateTaskParams {
  title: string;
  description?: string;
  userId: string;
}

export interface UpdateTaskParams {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  completedAt?: Date;
}

export abstract class TaskRepository {
  abstract create(task: CreateTaskParams): Promise<Task>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findAll(userId?: string): Promise<Task[]>;
  abstract update(id: string, params: UpdateTaskParams): Promise<Task>;
  abstract delete(id: string): Promise<void>;
}
