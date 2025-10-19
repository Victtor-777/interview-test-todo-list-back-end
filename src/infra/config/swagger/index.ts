import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export class SwaggerConfig {
  static config(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle("Base API")
      .setDescription("Documentação da API Base")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }
}
