import { TokenAdapter, TokenPayload } from "@domain/adapters/token";

export class TokenServiceStub implements TokenAdapter {
  async generateToken(): Promise<string> {
    return "generated-token";
  }

  async getPayloadFromToken(): Promise<TokenPayload | null> {
    return { id: "user-id" };
  }
}
