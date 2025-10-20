import { applyDecorators } from "@nestjs/common";
import {
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse
} from "@nestjs/swagger";
import { ExceptionResponseDto } from "../error/exception";

export const DeleteTaskResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Task deleted successfully"
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token",
    type: ExceptionResponseDto
  }),
  ApiForbiddenResponse({
    description: "Forbidden - You can only delete your own tasks",
    type: ExceptionResponseDto
  }),
  ApiNotFoundResponse({
    description: "Task not found",
    type: ExceptionResponseDto
  })
);
