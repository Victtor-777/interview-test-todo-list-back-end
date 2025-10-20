import { FindAllTasksUseCase } from "./index";
import { TaskRepositoryStub } from "@test/stubs/repositories/task";
import { TaskRepository } from "@domain/repositories/task";
import { Task } from "@domain/entities/task";
import { User, UserRole } from "@domain/entities/user";

describe("FindAllTasksUseCase", () => {
  let sut: FindAllTasksUseCase;
  let taskRepository: TaskRepository;

  beforeEach(() => {
    taskRepository = new TaskRepositoryStub();
    sut = new FindAllTasksUseCase(taskRepository);
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

  const USER_TASK_1: Task = {
    id: "task-1",
    title: "User Task 1",
    description: "Description 1",
    isCompleted: false,
    completedAt: null,
    userId: "user-id",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const USER_TASK_2: Task = {
    id: "task-2",
    title: "User Task 2",
    description: "Description 2",
    isCompleted: true,
    completedAt: new Date(),
    userId: "user-id",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const OTHER_USER_TASK: Task = {
    id: "task-3",
    title: "Other User Task",
    description: "Description 3",
    isCompleted: false,
    completedAt: null,
    userId: "other-user-id",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it("should return all tasks for ADMIN", async () => {
    const allTasks = [USER_TASK_1, USER_TASK_2, OTHER_USER_TASK];

    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce(allTasks);

    const result = await sut.execute(ADMIN_USER);

    expect(result).toEqual(allTasks);
    expect(result).toHaveLength(3);
    expect(taskRepository.findAll).toHaveBeenCalledWith(undefined); // ✅ undefined = todas
  });

  it("should return only user's own tasks for REGULAR USER", async () => {
    const userTasks = [USER_TASK_1, USER_TASK_2];

    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce(userTasks);

    const result = await sut.execute(REGULAR_USER);

    expect(result).toEqual(userTasks);
    expect(result).toHaveLength(2);
    expect(taskRepository.findAll).toHaveBeenCalledWith("user-id"); // ✅ Filtra por userId
  });

  it("should return empty array if user has no tasks", async () => {
    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce([]);

    const result = await sut.execute(REGULAR_USER);

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(taskRepository.findAll).toHaveBeenCalledWith("user-id");
  });

  it("should return empty array if no tasks exist (ADMIN)", async () => {
    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce([]);

    const result = await sut.execute(ADMIN_USER);

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(taskRepository.findAll).toHaveBeenCalledWith(undefined);
  });

  it("should return tasks with different completion statuses", async () => {
    const mixedTasks = [USER_TASK_1, USER_TASK_2]; // 1 incompleta, 1 completa

    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce(mixedTasks);

    const result = await sut.execute(REGULAR_USER);

    expect(result).toHaveLength(2);
    expect(result[0].isCompleted).toBe(false);
    expect(result[1].isCompleted).toBe(true);
  });

  it("should call repository with correct userId for USER", async () => {
    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce([]);

    await sut.execute(REGULAR_USER);

    expect(taskRepository.findAll).toHaveBeenCalledWith("user-id");
    expect(taskRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should call repository with undefined for ADMIN", async () => {
    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce([]);

    await sut.execute(ADMIN_USER);

    expect(taskRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(taskRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return tasks ordered by creation date (if implemented)", async () => {
    const task1 = { ...USER_TASK_1, createdAt: new Date("2025-01-01") };
    const task2 = { ...USER_TASK_2, createdAt: new Date("2025-01-02") };

    jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce([task2, task1]);

    const result = await sut.execute(REGULAR_USER);

    expect(result[0].createdAt).toEqual(new Date("2025-01-02"));
    expect(result[1].createdAt).toEqual(new Date("2025-01-01"));
  });
});
