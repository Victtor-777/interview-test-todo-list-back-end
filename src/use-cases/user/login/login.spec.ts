import { LoginUseCase } from "./index";
import { UserRepositoryStub } from "@test/stubs/repositories/user";
import { CryptographyServiceStub } from "@test/stubs/adapters/cryptography";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { TokenServiceStub } from "@test/stubs/adapters/token";
import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TokenAdapter } from "@domain/adapters/token";
import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user";

describe("LoginUseCase", () => {
  let sut: LoginUseCase;
  let userRepository: UserRepository;
  let cryptographyService: CryptographyAdapter;
  let exceptionService: ExceptionsAdapter;
  let tokenService: TokenAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    cryptographyService = new CryptographyServiceStub();
    exceptionService = new ExceptionsServiceStub();
    tokenService = new TokenServiceStub();
    sut = new LoginUseCase(
      userRepository,
      cryptographyService,
      tokenService,
      exceptionService
    );
  });

  const USER: User = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    cpf: "12345678901",
    password: "hashed-Password123",
    contact: "123456789",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it("should return an access token if credentials are valid", async () => {
    jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(USER);
    jest.spyOn(cryptographyService, "compare").mockResolvedValueOnce(true);
    jest
      .spyOn(tokenService, "generateToken")
      .mockResolvedValueOnce("generated-token");

    const result = await sut.login(USER.email, "Password123");

    expect(result).toEqual({ accessToken: "generated-token" });
  });

  it("should throw an error if user is not found", async () => {
    jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);
    jest.spyOn(exceptionService, "unauthorized");

    await sut.login(USER.email, "Password123");

    expect(exceptionService.unauthorized).toHaveBeenCalledWith({
      message: "Invalid credentials"
    });
  });

  it("should throw an error if password is invalid", async () => {
    jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(USER);
    jest.spyOn(cryptographyService, "compare").mockResolvedValueOnce(false);
    jest.spyOn(exceptionService, "unauthorized");

    await sut.login(USER.email, "WrongPassword");

    expect(exceptionService.unauthorized).toHaveBeenCalledWith({
      message: "Invalid credentials"
    });
  });
});
