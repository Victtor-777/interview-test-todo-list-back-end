import { Module } from "@nestjs/common";
import { UserModule } from "../user";
import { CryptographyModule } from "../cryptography";
import { ExceptionsModule } from "../exceptions";
import { DatabaseModule } from "../database";

@Module({
  imports: [DatabaseModule, UserModule, CryptographyModule, ExceptionsModule]
})
export class AppModule {}
