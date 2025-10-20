import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto {
  @ApiProperty({
    description: "Task title",
    example: "Buy groceries",
    required: false
  })
  @IsOptional()
  @IsString({ message: "Title must be a string" })
  @MaxLength(255, { message: "Title must be at most 255 characters" })
  title?: string;

  @ApiProperty({
    description: "Task description",
    example: "Buy milk, eggs, and bread",
    required: false
  })
  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;

  @ApiProperty({
    description: "Task completion status",
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: "isCompleted must be a boolean" })
  isCompleted?: boolean;
}
