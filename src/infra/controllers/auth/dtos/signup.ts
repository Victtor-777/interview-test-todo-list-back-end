import { UserRole } from "@domain/entities/user";
import { CreateUserParams } from "@domain/repositories/user";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength
} from "class-validator";

export class SignUpDto implements CreateUserParams {
  @ApiProperty({ description: "Nome do usuário" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Email do usuário" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Senha do usuário" })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: "Senha deve conter letras maiúsculas e minúsculas"
  })
  password: string;

  @ApiProperty({ description: "Confirmação da senha do usuário" })
  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @ApiProperty({
    description: "Role do usuário",
    enum: UserRole,
    default: UserRole.USER,
    required: false
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
