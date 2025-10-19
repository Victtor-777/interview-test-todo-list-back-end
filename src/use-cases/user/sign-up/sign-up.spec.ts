import { SignUpUseCase } from "./index";
import { UserRepositoryStub } from "@test/stubs/repositories/user";
import { CreateUserParams } from "@domain/repositories/user";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { CryptographyServiceStub } from "@test/stubs/adapters/cryptography";
import { User, UserRole } from "@domain/entities/user";

describe("SignUpUseCase", () => {
  let sut: SignUpUseCase;
  let userRepository: UserRepositoryStub;
  let cryptographyService: CryptographyAdapter;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    cryptographyService = new CryptographyServiceStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new SignUpUseCase(
      userRepository,
      cryptographyService,
      exceptionService
    );
  });

  const USER: CreateUserParams = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123",
    role: UserRole.USER
  };

  it("should create a new user", async () => {
    jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);
    jest
      .spyOn(cryptographyService, "generateHash")
      .mockResolvedValueOnce("hashed-Password123");
    jest.spyOn(userRepository, "create");

    await sut.signUp(USER, "Password123");

    expect(userRepository.create).toHaveBeenCalledWith({
      ...USER,
      password: "hashed-Password123"
    });
  });

  it("should throw an error if passwords do not match", async () => {
    jest.spyOn(exceptionService, "badRequest");

    await expect(sut.signUp(USER, "DifferentPassword"));

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Passwords do not match"
    });
  });

  it("should throw an error if email is already registered", async () => {
    jest
      .spyOn(userRepository, "findByEmail")
      .mockResolvedValueOnce(USER as User);
    jest.spyOn(exceptionService, "badRequest");

    await sut.signUp(USER, "Password123");

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Email already registered"
    });
  });
});
