import { RoleValidatorUseCase } from "./index";
import { User, UserRole } from "@domain/entities/user";

describe("RoleValidatorUseCase", () => {
  let sut: RoleValidatorUseCase;

  beforeEach(() => {
    sut = new RoleValidatorUseCase();
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

  it("should validate ADMIN role successfully", () => {
    const result = sut.validate([UserRole.ADMIN], ADMIN_USER);

    expect(result).toBe(true);
  });

  it("should validate USER role successfully", () => {
    const result = sut.validate([UserRole.USER], REGULAR_USER);

    expect(result).toBe(true);
  });

  it("should validate multiple roles with ADMIN", () => {
    const result = sut.validate([UserRole.ADMIN, UserRole.USER], ADMIN_USER);

    expect(result).toBe(true);
  });

  it("should validate multiple roles with USER", () => {
    const result = sut.validate([UserRole.ADMIN, UserRole.USER], REGULAR_USER);

    expect(result).toBe(true);
  });

  it("should return false if user role is not in allowed roles", () => {
    const result = sut.validate([UserRole.ADMIN], REGULAR_USER);

    expect(result).toBe(false);
  });

  it("should return false if user is undefined", () => {
    const result = sut.validate([UserRole.USER], undefined);

    expect(result).toBe(false);
  });

  it("should return false if user is null", () => {
    const result = sut.validate([UserRole.USER], null);

    expect(result).toBe(false);
  });

  it("should return false for ADMIN-only route with USER", () => {
    const result = sut.validate([UserRole.ADMIN], REGULAR_USER);

    expect(result).toBe(false);
  });

  it("should return true for USER-only route with USER", () => {
    const result = sut.validate([UserRole.USER], REGULAR_USER);

    expect(result).toBe(true);
  });

  it("should handle empty roles array", () => {
    const result = sut.validate([], REGULAR_USER);

    expect(result).toBe(false);
  });
});
