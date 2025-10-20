import { applyDecorators } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiProperty,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { ExceptionResponseDto } from "../error/exception";
import { UserRole } from "@domain/entities/user";

export class CurrentUserResponseDto {
  @ApiProperty({
    description: "User ID",
    example: "550e8400-e29b-41d4-a716-446655440000"
  })
  id: string;

  @ApiProperty({
    description: "User name",
    example: "John Doe"
  })
  name: string;

  @ApiProperty({
    description: "User email",
    example: "john@example.com"
  })
  email: string;

  @ApiProperty({
    description: "User role",
    enum: UserRole,
    example: UserRole.USER
  })
  role: UserRole;

  @ApiProperty({
    description: "Account creation date",
    example: "2025-10-20T10:00:00.000Z"
  })
  createdAt: Date;

  @ApiProperty({
    description: "Last update date",
    example: "2025-10-20T10:00:00.000Z"
  })
  updatedAt: Date;
}

export const GetCurrentUserResponses = applyDecorators(
  ApiOkResponse({
    description: "Current user retrieved successfully",
    type: CurrentUserResponseDto
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token",
    type: ExceptionResponseDto
  })
);
