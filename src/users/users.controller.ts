import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUser } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { USER_NOT_UPDATED } from './users.constants';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUserById(@Param('id') id: number, @Body() dto: UpdateUser) {
    console.log(dto);
    const count = await this.userService.updateUserById(id, dto);
    console.log(count);
    return `Данные пользователя с id ${id} успешно обновлены`;
  }
}
