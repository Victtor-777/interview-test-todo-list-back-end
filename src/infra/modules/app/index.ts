import { Module } from "@nestjs/common";
import { UserModule } from "../user";
import { CryptographyModule } from "../cryptography";
import { ExceptionsModule } from "../exceptions";
import { DatabaseModule } from "../database";
import { TaskModule } from "../task";
import { AuthenticationModule } from "../authentication";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CryptographyModule,
    ExceptionsModule,
    TaskModule,
    AuthenticationModule
  ]
})
export class AppModule {}
