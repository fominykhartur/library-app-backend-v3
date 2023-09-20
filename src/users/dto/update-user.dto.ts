import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUser {
  @ApiProperty({ example: 'test@mail.com', description: 'email пользователя' })
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный адрес почты' })
  email?: string;

  @ApiProperty({ example: 'username', description: 'Имя пользователя' })
  @IsOptional()
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  username?: string;
}
