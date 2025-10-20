import { UserMapperUseCase } from "./index";
import { User as PrismaUser, UserRole as PrismaUserRole } from "@prisma/client";
import { UserRole as DomainUserRole } from "@domain/entities/user";

describe("UserMapperUseCase", () => {
  let sut: UserMapperUseCase;

  beforeEach(() => {
    sut = new UserMapperUseCase();
  });

  const PRISMA_USER: PrismaUser = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed-password",
    role: PrismaUserRole.USER,
    createdAt: new Date("2025-10-15T10:00:00.000Z"),
    updatedAt: new Date("2025-10-15T10:00:00.000Z")
  };

  const PRISMA_ADMIN: PrismaUser = {
    id: "admin-id",
    name: "Admin User",
    email: "admin@example.com",
    password: "hashed-password",
    role: PrismaUserRole.ADMIN,
    createdAt: new Date("2025-10-15T10:00:00.000Z"),
    updatedAt: new Date("2025-10-15T10:00:00.000Z")
  };

  it("should map Prisma User to Domain User", () => {
    const result = sut.toDomain(PRISMA_USER);

    expect(result).toEqual({
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "John Doe",
      email: "john@example.com",
      password: "hashed-password",
      role: DomainUserRole.USER,
      createdAt: new Date("2025-10-15T10:00:00.000Z"),
      updatedAt: new Date("2025-10-15T10:00:00.000Z")
    });
  });

  it("should map USER role correctly", () => {
    const result = sut.toDomain(PRISMA_USER);

    expect(result.role).toBe(DomainUserRole.USER);
  });

  it("should map ADMIN role correctly", () => {
    const result = sut.toDomain(PRISMA_ADMIN);

    expect(result.role).toBe(DomainUserRole.ADMIN);
  });

  it("should preserve all user properties", () => {
    const result = sut.toDomain(PRISMA_USER);

    expect(result.id).toBe(PRISMA_USER.id);
    expect(result.name).toBe(PRISMA_USER.name);
    expect(result.email).toBe(PRISMA_USER.email);
    expect(result.password).toBe(PRISMA_USER.password);
    expect(result.createdAt).toEqual(PRISMA_USER.createdAt);
    expect(result.updatedAt).toEqual(PRISMA_USER.updatedAt);
  });

  it("should preserve date objects", () => {
    const result = sut.toDomain(PRISMA_USER);

    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });
});
