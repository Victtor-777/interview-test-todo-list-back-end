import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { TaskResponseDto } from "./create";
import { ExceptionResponseDto } from "../error/exception";

export const FindAllTasksResponses = applyDecorators(
  ApiOkResponse({
    description: "Tasks retrieved successfully",
    type: [TaskResponseDto]
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token",
    type: ExceptionResponseDto
  })
);
