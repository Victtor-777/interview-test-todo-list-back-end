import { Task } from "@domain/entities/task";
import {
  CreateTaskParams,
  TaskRepository,
  UpdateTaskParams
} from "@domain/repositories/task";
import { Prisma } from "@infra/config/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: Prisma) {}

  async create(params: CreateTaskParams): Promise<Task> {
    return this.prisma.task.create({
      data: params
    });
  }

  update(id: string, params: UpdateTaskParams): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: params
    });
  }

  findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id }
    });
  }

  findAll(userId?: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id }
    });
  }
}
