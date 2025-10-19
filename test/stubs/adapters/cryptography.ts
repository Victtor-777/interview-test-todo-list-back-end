import { CryptographyAdapter } from "@domain/adapters/cryptography";

export class CryptographyServiceStub implements CryptographyAdapter {
  async generateHash(): Promise<string> {
    return;
  }

  async compare(): Promise<boolean> {
    return;
  }
}
