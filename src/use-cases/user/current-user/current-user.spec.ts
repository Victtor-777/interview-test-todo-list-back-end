import { GetCurrentUserUseCase } from "./index";
import { UserRepositoryStub } from "@test/stubs/repositories/user";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { UserRepository } from "@domain/repositories/user";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { User, UserRole } from "@domain/entities/user";

describe("GetCurrentUserUseCase", () => {
  let sut: GetCurrentUserUseCase;
  let userRepository: UserRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new GetCurrentUserUseCase(userRepository, exceptionService);
  });

  const EXISTING_USER: User = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed-password",
    role: UserRole.USER,
    createdAt: new Date("2025-10-15T10:00:00.000Z"),
    updatedAt: new Date("2025-10-15T10:00:00.000Z")
  };

  it("should return user with ADMIN role", async () => {
    const adminUser: User = {
      ...EXISTING_USER,
      role: UserRole.ADMIN
    };

    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(adminUser);

    const result = (await sut.execute(
      "550e8400-e29b-41d4-a716-446655440000"
    )) as User;

    expect(result.role).toBe(UserRole.ADMIN);
  });

  it("should preserve createdAt and updatedAt dates", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(EXISTING_USER);

    const result = (await sut.execute(
      "550e8400-e29b-41d4-a716-446655440000"
    )) as User;

    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
    expect(result.createdAt).toEqual(new Date("2025-10-15T10:00:00.000Z"));
    expect(result.updatedAt).toEqual(new Date("2025-10-15T10:00:00.000Z"));
  });

  it("should throw error if user not found", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(null);
    jest.spyOn(exceptionService, "notFound");

    await sut.execute("non-existent-user-id");

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "User not found"
    });
  });

  it("should call repository with correct user id", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(EXISTING_USER);

    await sut.execute("550e8400-e29b-41d4-a716-446655440000");

    expect(userRepository.findById).toHaveBeenCalledWith(
      "550e8400-e29b-41d4-a716-446655440000"
    );
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });
});
