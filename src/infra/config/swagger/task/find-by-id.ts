import { applyDecorators } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse
} from "@nestjs/swagger";
import { TaskResponseDto } from "./create";
import { ExceptionResponseDto } from "../error/exception";

export const FindTaskByIdResponses = applyDecorators(
  ApiOkResponse({
    description: "Task retrieved successfully",
    type: TaskResponseDto
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token",
    type: ExceptionResponseDto
  }),
  ApiForbiddenResponse({
    description: "Forbidden - You can only access your own tasks",
    type: ExceptionResponseDto
  }),
  ApiNotFoundResponse({
    description: "Task not found",
    type: ExceptionResponseDto
  })
);
