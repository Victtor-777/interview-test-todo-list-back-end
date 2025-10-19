import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user";

export class UserRepositoryStub implements UserRepository {
  create(): Promise<User> {
    return;
  }

  findById(): Promise<User | null> {
    return;
  }

  findByEmail(): Promise<User | null> {
    return;
  }
}
