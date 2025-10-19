import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class BcryptIntegration implements CryptographyAdapter {
  private HASH_SALT_ROUNDS = 10;

  generateHash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_ROUNDS);
  }

  compare(plainText: string, encryptText: string): Promise<boolean> {
    return compare(plainText, encryptText);
  }
}
