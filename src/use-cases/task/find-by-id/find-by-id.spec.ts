import { FindTaskByIdUseCase } from "./index";
import { TaskRepositoryStub } from "@test/stubs/repositories/task";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TaskRepository } from "@domain/repositories/task";
import { Task } from "@domain/entities/task";
import { User, UserRole } from "@domain/entities/user";

describe("FindTaskByIdUseCase", () => {
  let sut: FindTaskByIdUseCase;
  let taskRepository: TaskRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    taskRepository = new TaskRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new FindTaskByIdUseCase(taskRepository, exceptionService);
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

  it("should find a task by id successfully", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);

    const result = await sut.execute("task-id", REGULAR_USER);

    expect(result).toEqual(EXISTING_TASK);
    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
    expect(taskRepository.findById).toHaveBeenCalledTimes(1);
  });

  it("should allow USER to find their own task", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);

    const result = await sut.execute("task-id", REGULAR_USER);

    expect(result).toEqual(EXISTING_TASK);
    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
  });

  it("should allow ADMIN to find any task", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);

    const result = await sut.execute("task-id", ADMIN_USER);

    expect(result).toEqual(EXISTING_TASK);
    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
  });

  it("should throw error if task not found", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);
    jest.spyOn(exceptionService, "notFound");

    await sut.execute("non-existent-id", REGULAR_USER);

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Task not found"
    });
  });

  it("should throw error if USER tries to access another user's task", async () => {
    const otherUserTask: Task = {
      ...EXISTING_TASK,
      userId: "other-user-id"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(otherUserTask);
    jest.spyOn(exceptionService, "forbidden");

    await sut.execute("task-id", REGULAR_USER);

    expect(exceptionService.forbidden).toHaveBeenCalledWith({
      message: "You do not have permission to access this task"
    });
  });

  it("should allow ADMIN to access task from any user", async () => {
    const otherUserTask: Task = {
      ...EXISTING_TASK,
      userId: "other-user-id"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(otherUserTask);

    const result = await sut.execute("task-id", ADMIN_USER);

    expect(result).toEqual(otherUserTask);
    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
  });

  it("should return completed task", async () => {
    const completedTask: Task = {
      ...EXISTING_TASK,
      isCompleted: true,
      completedAt: new Date()
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(completedTask);

    const result = (await sut.execute("task-id", REGULAR_USER)) as Task;

    expect(result).toEqual(completedTask);
    expect(result.isCompleted).toBe(true);
    expect(result.completedAt).toBeInstanceOf(Date);
  });

  it("should return task without description", async () => {
    const taskWithoutDescription: Task = {
      ...EXISTING_TASK,
      description: null
    };

    jest
      .spyOn(taskRepository, "findById")
      .mockResolvedValueOnce(taskWithoutDescription);

    const result = (await sut.execute("task-id", REGULAR_USER)) as Task;

    expect(result).toEqual(taskWithoutDescription);
    expect(result.description).toBeNull();
  });
});
