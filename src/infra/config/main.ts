import { NestFactory } from "@nestjs/core";
import { AppModule } from "@infra/modules/app";
import { SwaggerConfig } from "./swagger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.config(app);
  await app.listen(3001);
}
bootstrap();
