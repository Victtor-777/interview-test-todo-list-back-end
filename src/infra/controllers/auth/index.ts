import { User } from "@domain/entities/user";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignUpUseCase } from "@use-cases/user/sign-up";
import { SignUpDto } from "./dtos/signup";
import { LoginUseCase, LoginUseCaseReturn } from "@use-cases/user/login";
import { LoginDto } from "./dtos/login";
import { LoginResponses } from "@infra/config/swagger/auth/login";
import { SignUpResponses } from "@infra/config/swagger/auth/sign-up";
import { AuthDecorator } from "@infra/commons/decorators/auth";
import { GetCurrentUserResponses } from "@infra/config/swagger/auth/current-user";
import { AuthenticatedRequest } from "@use-cases/authentication/route-authentication";
import { GetCurrentUserUseCase } from "@use-cases/user/current-user";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase
  ) {}

  @Post("signup")
  @SignUpResponses
  async signup(@Body() body: SignUpDto): Promise<User | void> {
    const { name, email, password, confirmPassword, role } = body;
    const user = { name, email, password, role };
    return this.signUpUseCase.signUp(user, confirmPassword);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @LoginResponses
  async login(@Body() body: LoginDto): LoginUseCaseReturn {
    const { email, password } = body;
    return this.loginUseCase.login(email, password);
  }

  @Get("me")
  @AuthDecorator()
  @GetCurrentUserResponses
  async getCurrentUser(
    @Req() req: AuthenticatedRequest
  ): Promise<Omit<User, "password"> | void> {
    return this.getCurrentUserUseCase.execute(req.user.id);
  }
}
