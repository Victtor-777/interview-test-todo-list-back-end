import { RouteAuthenticationUseCase, AuthenticatedRequest } from "./index";
import { UserRepositoryStub } from "@test/stubs/repositories/user";
import { TokenServiceStub } from "@test/stubs/adapters/token";
import { UserRepository } from "@domain/repositories/user";
import { TokenAdapter } from "@domain/adapters/token";
import { User, UserRole } from "@domain/entities/user";

describe("RouteAuthenticationUseCase", () => {
  let sut: RouteAuthenticationUseCase;
  let userRepository: UserRepository;
  let tokenService: TokenAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    tokenService = new TokenServiceStub();
    sut = new RouteAuthenticationUseCase(userRepository, tokenService);
  });

  const VALID_USER: User = {
    id: "user-id",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed-password",
    role: UserRole.USER,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const createMockRequest = (authorization?: string): AuthenticatedRequest => {
    return {
      headers: {
        authorization
      }
    } as AuthenticatedRequest;
  };

  it("should validate request with valid token", async () => {
    const request = createMockRequest("Bearer valid-token");

    jest.spyOn(tokenService, "getPayloadFromToken").mockResolvedValueOnce({
      id: "user-id"
    });
    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(VALID_USER);

    const result = await sut.validate(request);

    expect(result).toBe(true);
    expect(request.user).toEqual(VALID_USER);
    expect(tokenService.getPayloadFromToken).toHaveBeenCalledWith(
      "valid-token"
    );
    expect(userRepository.findById).toHaveBeenCalledWith("user-id");
  });

  it("should return false if authorization header is missing", async () => {
    const request = createMockRequest();

    const result = await sut.validate(request);

    expect(result).toBe(false);
    expect(request.user).toBeUndefined();
  });

  it("should return false if token is missing after Bearer", async () => {
    const request = createMockRequest("Bearer ");

    const result = await sut.validate(request);

    expect(result).toBe(false);
    expect(request.user).toBeUndefined();
  });

  it("should return false if token payload is invalid", async () => {
    const request = createMockRequest("Bearer invalid-token");

    jest.spyOn(tokenService, "getPayloadFromToken").mockResolvedValueOnce(null);

    const result = await sut.validate(request);

    expect(result).toBe(false);
    expect(request.user).toBeUndefined();
  });

  it("should return false if user not found in database", async () => {
    const request = createMockRequest("Bearer valid-token");

    jest.spyOn(tokenService, "getPayloadFromToken").mockResolvedValueOnce({
      id: "non-existent-user"
    });
    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(null);

    const result = await sut.validate(request);

    expect(result).toBe(false);
    expect(request.user).toBeUndefined();
  });

  it("should attach user to request on successful validation", async () => {
    const request = createMockRequest("Bearer valid-token");

    jest.spyOn(tokenService, "getPayloadFromToken").mockResolvedValueOnce({
      id: "user-id"
    });
    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(VALID_USER);

    await sut.validate(request);

    expect(request.user).toBeDefined();
    expect(request.user?.id).toBe("user-id");
  });

  it("should extract token correctly from Bearer format", async () => {
    const request = createMockRequest("Bearer my-secret-token");

    jest.spyOn(tokenService, "getPayloadFromToken").mockResolvedValueOnce({
      id: "user-id"
    });
    jest.spyOn(userRepository, "findById").mockResolvedValueOnce(VALID_USER);

    await sut.validate(request);

    expect(tokenService.getPayloadFromToken).toHaveBeenCalledWith(
      "my-secret-token"
    );
  });
});
