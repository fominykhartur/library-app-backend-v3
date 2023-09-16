import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';
import {
  USER_EXISTS,
  USER_NOT_FOUND,
  USER_WRONG_PASSWORD,
} from './auth.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: USER_EXISTS })
  @Post('register')
  async register(@Body() dto: AuthDto): Promise<User> {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'jwt token',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: USER_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: USER_WRONG_PASSWORD,
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<{ token: string }> {
    return this.authService.login(dto);
  }

  //   @Get('refresh')

  @Get('logout')
  async logout() {
    return '';
  }
}
