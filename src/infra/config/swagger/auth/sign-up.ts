import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiBadRequestResponse } from "@nestjs/swagger";

export const SignUpResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Usuário criado com sucesso"
  }),
  ApiBadRequestResponse({
    description: "Erro na criação do usuário"
  })
);
