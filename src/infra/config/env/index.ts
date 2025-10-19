import { plainToInstance } from "class-transformer";
import { IsString, validateSync } from "class-validator";

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  PORT: string;

  @IsString()
  PGPORT: string;

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;
}

export function validate(
  config: Record<string, unknown>
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
