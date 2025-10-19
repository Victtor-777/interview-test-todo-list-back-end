import { TokenAdapter } from "@domain/adapters/token";
import { JwtIntegration } from "@infra/integrations/token/jwt";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: "30d" }
    })
  ],
  providers: [{ provide: TokenAdapter, useClass: JwtIntegration }],
  exports: [TokenAdapter]
})
export class TokenModule {}
