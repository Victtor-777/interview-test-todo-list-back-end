import { Module } from "@nestjs/common";
import { TokenModule } from "../token";
import { CryptographyModule } from "../cryptography";
import { DatabaseModule } from "../database";
import { ExceptionsModule } from "../exceptions";
import { RoleValidatorUseCase } from "@use-cases/authentication/role-validator";
import { RouteAuthenticationUseCase } from "@use-cases/authentication/route-authentication";
import { AuthGuard } from "@infra/commons/guards/auth";
import { RoleGuard } from "@infra/commons/guards/role";

@Module({
  imports: [TokenModule, CryptographyModule, DatabaseModule, ExceptionsModule],
  providers: [
    AuthGuard,
    RoleGuard,
    RoleValidatorUseCase,
    RouteAuthenticationUseCase
  ],
  exports: [
    AuthGuard,
    RoleGuard,
    RoleValidatorUseCase,
    RouteAuthenticationUseCase
  ]
})
export class AuthenticationModule {}
