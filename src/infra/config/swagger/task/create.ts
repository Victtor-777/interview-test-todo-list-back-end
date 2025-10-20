import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { ExceptionResponseDto } from "../error/exception";

export class TaskResponseDto {
  @ApiProperty({
    description: "Task ID",
    example: "550e8400-e29b-41d4-a716-446655440000"
  })
  id: string;

  @ApiProperty({
    description: "Task title",
    example: "Buy groceries"
  })
  title: string;

  @ApiProperty({
    description: "Task description",
    example: "Buy milk, eggs, and bread",
    required: false
  })
  description?: string;

  @ApiProperty({
    description: "Task completion status",
    example: false
  })
  isCompleted: boolean;

  @ApiProperty({
    description: "Date when task was completed",
    example: "2025-10-19T22:30:00.000Z",
    required: false
  })
  completedAt?: Date;

  @ApiProperty({
    description: "User ID who owns the task",
    example: "550e8400-e29b-41d4-a716-446655440000"
  })
  userId: string;

  @ApiProperty({
    description: "Created at",
    example: "2025-10-19T22:00:00.000Z"
  })
  createdAt: Date;

  @ApiProperty({
    description: "Updated at",
    example: "2025-10-19T22:00:00.000Z"
  })
  updatedAt: Date;
}

export const CreateTaskResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Task created successfully",
    type: TaskResponseDto
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token",
    type: ExceptionResponseDto
  }),
  ApiBadRequestResponse({
    description: "Invalid data - Title is required",
    type: ExceptionResponseDto
  })
);
