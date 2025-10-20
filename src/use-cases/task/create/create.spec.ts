import { CreateTaskUseCase } from "./index";
import { TaskRepositoryStub } from "@test/stubs/repositories/task";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TaskRepository, CreateTaskParams } from "@domain/repositories/task";
import { Task } from "@domain/entities/task";

describe("CreateTaskUseCase", () => {
  let sut: CreateTaskUseCase;
  let taskRepository: TaskRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    taskRepository = new TaskRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new CreateTaskUseCase(taskRepository, exceptionService);
  });

  const VALID_TASK_PARAMS: CreateTaskParams = {
    title: "Buy groceries",
    description: "Buy milk, eggs, and bread",
    userId: "550e8400-e29b-41d4-a716-446655440000"
  };

  const CREATED_TASK: Task = {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Buy groceries",
    description: "Buy milk, eggs, and bread",
    isCompleted: false,
    completedAt: null,
    userId: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it("should create a new task successfully", async () => {
    jest.spyOn(taskRepository, "create").mockResolvedValueOnce(CREATED_TASK);

    const result = await sut.execute(VALID_TASK_PARAMS);

    expect(result).toEqual(CREATED_TASK);
    expect(taskRepository.create).toHaveBeenCalledWith(VALID_TASK_PARAMS);
    expect(taskRepository.create).toHaveBeenCalledTimes(1);
  });

  it("should create a task without description", async () => {
    const paramsWithoutDescription: CreateTaskParams = {
      title: "Simple task",
      userId: "550e8400-e29b-41d4-a716-446655440000"
    };

    const taskWithoutDescription: Task = {
      ...CREATED_TASK,
      title: "Simple task",
      description: null
    };

    jest
      .spyOn(taskRepository, "create")
      .mockResolvedValueOnce(taskWithoutDescription);

    const result = await sut.execute(paramsWithoutDescription);

    expect(result).toEqual(taskWithoutDescription);
    expect(taskRepository.create).toHaveBeenCalledWith(
      paramsWithoutDescription
    );
  });

  it("should throw error if title is empty", async () => {
    const invalidParams: CreateTaskParams = {
      title: "",
      userId: "550e8400-e29b-41d4-a716-446655440000"
    };

    jest.spyOn(exceptionService, "badRequest");
    jest.spyOn(taskRepository, "create");

    await sut.execute(invalidParams);

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Title is required"
    });
    expect(taskRepository.create).not.toHaveBeenCalled();
  });

  it("should throw error if title contains only whitespace", async () => {
    const invalidParams: CreateTaskParams = {
      title: "   ",
      userId: "550e8400-e29b-41d4-a716-446655440000"
    };

    jest.spyOn(exceptionService, "badRequest");
    jest.spyOn(taskRepository, "create");

    await sut.execute(invalidParams);

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Title is required"
    });
    expect(taskRepository.create).not.toHaveBeenCalled();
  });

  it("should throw error if userId is empty", async () => {
    const invalidParams: CreateTaskParams = {
      title: "Valid title",
      userId: ""
    };

    jest.spyOn(exceptionService, "badRequest");
    jest.spyOn(taskRepository, "create");

    await sut.execute(invalidParams);

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "User ID is required"
    });
    expect(taskRepository.create).not.toHaveBeenCalled();
  });

  it("should throw error if userId contains only whitespace", async () => {
    const invalidParams: CreateTaskParams = {
      title: "Valid title",
      userId: "   "
    };

    jest.spyOn(exceptionService, "badRequest");
    jest.spyOn(taskRepository, "create");

    await sut.execute(invalidParams);

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "User ID is required"
    });
    expect(taskRepository.create).not.toHaveBeenCalled();
  });
});
