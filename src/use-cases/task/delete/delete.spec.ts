import { DeleteTaskUseCase } from "./index";
import { TaskRepositoryStub } from "@test/stubs/repositories/task";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TaskRepository } from "@domain/repositories/task";
import { Task } from "@domain/entities/task";
import { User, UserRole } from "@domain/entities/user";

describe("DeleteTaskUseCase", () => {
  let sut: DeleteTaskUseCase;
  let taskRepository: TaskRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    taskRepository = new TaskRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new DeleteTaskUseCase(taskRepository, exceptionService);
  });

  const ADMIN_USER: User = {
    id: "admin-id",
    name: "Admin User",
    email: "admin@example.com",
    password: "hashed-password",
    role: UserRole.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const REGULAR_USER: User = {
    id: "user-id",
    name: "Regular User",
    email: "user@example.com",
    password: "hashed-password",
    role: UserRole.USER,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const EXISTING_TASK: Task = {
    id: "task-id",
    title: "Buy groceries",
    description: "Buy milk, eggs, and bread",
    isCompleted: false,
    completedAt: null,
    userId: "user-id",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it("should delete a task successfully", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "delete").mockResolvedValueOnce(undefined);

    await sut.execute("task-id", REGULAR_USER);

    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledTimes(1);
  });

  it("should allow ADMIN to delete any task", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "delete").mockResolvedValueOnce(undefined);

    await sut.execute("task-id", ADMIN_USER);

    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledTimes(1);
  });

  it("should allow USER to delete their own task", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "delete").mockResolvedValueOnce(undefined);

    await sut.execute("task-id", REGULAR_USER);

    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledTimes(1);
  });

  it("should throw error if task not found", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);
    jest.spyOn(exceptionService, "notFound");
    jest.spyOn(taskRepository, "delete");

    await sut.execute("non-existent-id", REGULAR_USER);

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Task not found"
    });
    expect(taskRepository.delete).not.toHaveBeenCalled();
  });

  it("should throw error if USER tries to delete another user's task", async () => {
    const otherUserTask: Task = {
      ...EXISTING_TASK,
      userId: "other-user-id"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(otherUserTask);
    jest.spyOn(exceptionService, "forbidden");
    jest.spyOn(taskRepository, "delete");

    await sut.execute("task-id", REGULAR_USER);

    expect(exceptionService.forbidden).toHaveBeenCalledWith({
      message: "You do not have permission to delete this task"
    });
    expect(taskRepository.delete).not.toHaveBeenCalled();
  });

  it("should allow ADMIN to delete task from any user", async () => {
    const otherUserTask: Task = {
      ...EXISTING_TASK,
      userId: "other-user-id"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(otherUserTask);
    jest.spyOn(taskRepository, "delete").mockResolvedValueOnce(undefined);

    await sut.execute("task-id", ADMIN_USER);

    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledTimes(1);
  });

  it("should delete a completed task", async () => {
    const completedTask: Task = {
      ...EXISTING_TASK,
      isCompleted: true,
      completedAt: new Date()
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(completedTask);
    jest.spyOn(taskRepository, "delete").mockResolvedValueOnce(undefined);

    await sut.execute("task-id", REGULAR_USER);

    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledWith("task-id");
    expect(taskRepository.delete).toHaveBeenCalledTimes(1);
  });

  it("should not throw error if task has no description", async () => {
    const taskWithoutDescription: Task = {
      ...EXISTING_TASK,
      description: null
    };

    jest
      .spyOn(taskRepository, "findById")
      .mockResolvedValueOnce(taskWithoutDescription);
    jest.spyOn(taskRepository, "delete").mockResolvedValueOnce(undefined);

    await sut.execute("task-id", REGULAR_USER);

    expect(taskRepository.delete).toHaveBeenCalledWith("task-id");
  });
});
