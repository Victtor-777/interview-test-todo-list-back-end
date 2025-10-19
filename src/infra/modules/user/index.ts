import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { AuthController } from "@infra/controllers/auth";
import { SignUpUseCase } from "@use-cases/user/sign-up";
import { CryptographyModule } from "../cryptography";
import { ExceptionsModule } from "../exceptions";
import { LoginUseCase } from "@use-cases/user/login";
import { TokenModule } from "../token";

@Module({
  imports: [DatabaseModule, CryptographyModule, ExceptionsModule, TokenModule],
  controllers: [AuthController],
  providers: [SignUpUseCase, LoginUseCase]
})
export class UserModule {}
