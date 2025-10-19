import { ExceptionsAdapter } from "@domain/adapters/exceptions";

export class ExceptionsServiceStub implements ExceptionsAdapter {
  badRequest(): void {}
  internalServerError(): void {}
  forbidden(): void {}
  unauthorized(): void {}
  notFound(): void {}
  wrongCredentials(): void {}
}
