import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { BcryptIntegration } from "@infra/integrations/cryptography/bycrypt";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    {
      provide: CryptographyAdapter,
      useClass: BcryptIntegration
    }
  ],
  exports: [CryptographyAdapter]
})
export class CryptographyModule {}
