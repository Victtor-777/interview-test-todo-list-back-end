import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
  @ApiProperty({
    description: "Task title",
    example: "Buy groceries",
    maxLength: 255
  })
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @MaxLength(255, { message: "Title must be at most 255 characters" })
  title: string;

  @ApiProperty({
    description: "Task description (optional)",
    example: "Buy milk, eggs, and bread",
    required: false
  })
  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;
}
