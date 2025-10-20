import { applyDecorators } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from "@nestjs/swagger";
import { TaskResponseDto } from "./create";
import { ExceptionResponseDto } from "../error/exception";

export const UpdateTaskResponses = applyDecorators(
  ApiOkResponse({
    description: "Task updated successfully",
    type: TaskResponseDto
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token",
    type: ExceptionResponseDto
  }),
  ApiForbiddenResponse({
    description: "Forbidden - You can only update your own tasks",
    type: ExceptionResponseDto
  }),
  ApiNotFoundResponse({
    description: "Task not found",
    type: ExceptionResponseDto
  }),
  ApiBadRequestResponse({
    description: "Invalid data",
    type: ExceptionResponseDto
  })
);
