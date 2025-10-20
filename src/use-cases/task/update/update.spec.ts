import { UpdateTaskUseCase } from "./index";
import { TaskRepositoryStub } from "@test/stubs/repositories/task";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TaskRepository, UpdateTaskParams } from "@domain/repositories/task";
import { Task } from "@domain/entities/task";
import { User, UserRole } from "@domain/entities/user";

describe("UpdateTaskUseCase", () => {
  let sut: UpdateTaskUseCase;
  let taskRepository: TaskRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    taskRepository = new TaskRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new UpdateTaskUseCase(taskRepository, exceptionService);
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

  it("should update a task successfully", async () => {
    const updateParams: UpdateTaskParams = {
      title: "Buy groceries and fruits"
    };

    const updatedTask: Task = {
      ...EXISTING_TASK,
      title: "Buy groceries and fruits"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "update").mockResolvedValueOnce(updatedTask);

    const result = await sut.execute("task-id", updateParams, REGULAR_USER);

    expect(result).toEqual(updatedTask);
    expect(taskRepository.findById).toHaveBeenCalledWith("task-id");
    expect(taskRepository.update).toHaveBeenCalledWith("task-id", updateParams);
    expect(taskRepository.update).toHaveBeenCalledTimes(1);
  });

  it("should set completedAt when marking task as completed", async () => {
    const updateParams: UpdateTaskParams = {
      isCompleted: true
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "update").mockResolvedValueOnce({
      ...EXISTING_TASK,
      isCompleted: true,
      completedAt: expect.any(Date)
    });

    await sut.execute("task-id", updateParams, REGULAR_USER);

    expect(taskRepository.update).toHaveBeenCalledWith("task-id", {
      isCompleted: true,
      completedAt: expect.any(Date)
    });
    expect(updateParams.completedAt).toBeInstanceOf(Date);
  });

  it("should set completedAt to null when unmarking task as completed", async () => {
    const completedTask: Task = {
      ...EXISTING_TASK,
      isCompleted: true,
      completedAt: new Date()
    };

    const updateParams: UpdateTaskParams = {
      isCompleted: false
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(completedTask);
    jest.spyOn(taskRepository, "update").mockResolvedValueOnce({
      ...completedTask,
      isCompleted: false,
      completedAt: null
    });

    await sut.execute("task-id", updateParams, REGULAR_USER);

    expect(taskRepository.update).toHaveBeenCalledWith("task-id", {
      isCompleted: false,
      completedAt: null
    });
    expect(updateParams.completedAt).toBeNull();
  });

  it("should not change completedAt if task is already completed", async () => {
    const completedTask: Task = {
      ...EXISTING_TASK,
      isCompleted: true,
      completedAt: new Date("2025-01-01")
    };

    const updateParams: UpdateTaskParams = {
      title: "Updated title"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(completedTask);
    jest.spyOn(taskRepository, "update").mockResolvedValueOnce({
      ...completedTask,
      title: "Updated title"
    });

    await sut.execute("task-id", updateParams, REGULAR_USER);

    expect(taskRepository.update).toHaveBeenCalledWith("task-id", updateParams);
    expect(updateParams.completedAt).toBeUndefined();
  });

  it("should allow ADMIN to update any task", async () => {
    const updateParams: UpdateTaskParams = {
      title: "Updated by admin"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "update").mockResolvedValueOnce({
      ...EXISTING_TASK,
      title: "Updated by admin"
    });

    const result = await sut.execute("task-id", updateParams, ADMIN_USER);

    expect(result).toBeDefined();
    expect(taskRepository.update).toHaveBeenCalledWith("task-id", updateParams);
  });

  it("should throw error if task not found", async () => {
    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);
    jest.spyOn(exceptionService, "notFound");
    jest.spyOn(taskRepository, "update");

    await sut.execute("non-existent-id", {}, REGULAR_USER);

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Task not found"
    });
    expect(taskRepository.update).not.toHaveBeenCalled();
  });

  it("should throw error if USER tries to update another user's task", async () => {
    const otherUserTask: Task = {
      ...EXISTING_TASK,
      userId: "other-user-id"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(otherUserTask);
    jest.spyOn(exceptionService, "forbidden");
    jest.spyOn(taskRepository, "update");

    await sut.execute("task-id", {}, REGULAR_USER);

    expect(exceptionService.forbidden).toHaveBeenCalledWith({
      message: "You can only update your own tasks"
    });
    expect(taskRepository.update).not.toHaveBeenCalled();
  });

  it("should allow USER to update their own task", async () => {
    const updateParams: UpdateTaskParams = {
      description: "Updated description"
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "update").mockResolvedValueOnce({
      ...EXISTING_TASK,
      description: "Updated description"
    });

    const result = await sut.execute("task-id", updateParams, REGULAR_USER);

    expect(result).toBeDefined();
    expect(taskRepository.update).toHaveBeenCalledWith("task-id", updateParams);
  });

  it("should update multiple fields at once", async () => {
    const updateParams: UpdateTaskParams = {
      title: "New title",
      description: "New description",
      isCompleted: true
    };

    jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(EXISTING_TASK);
    jest.spyOn(taskRepository, "update").mockResolvedValueOnce({
      ...EXISTING_TASK,
      ...updateParams,
      completedAt: expect.any(Date)
    });

    await sut.execute("task-id", updateParams, REGULAR_USER);

    expect(taskRepository.update).toHaveBeenCalledWith("task-id", {
      title: "New title",
      description: "New description",
      isCompleted: true,
      completedAt: expect.any(Date)
    });
  });
});
