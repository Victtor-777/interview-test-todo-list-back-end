import { AuthGuard } from "@infra/commons/guards/auth";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

export const AuthDecorator = (): MethodDecorator =>
  applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());
