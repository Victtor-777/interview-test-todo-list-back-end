import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { AuthController } from "@infra/controllers/auth";
import { SignUpUseCase } from "@use-cases/user/sign-up";
import { CryptographyModule } from "../cryptography";
import { ExceptionsModule } from "../exceptions";
import { LoginUseCase } from "@use-cases/user/login";
import { TokenModule } from "../token";
import { AuthenticationModule } from "../authentication";
import { GetCurrentUserUseCase } from "@use-cases/user/current-user";

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    ExceptionsModule,
    TokenModule,
    AuthenticationModule
  ],
  controllers: [AuthController],
  providers: [SignUpUseCase, LoginUseCase, GetCurrentUserUseCase]
})
export class UserModule {}
