import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'test@mail.com', description: 'email пользователя' })
  @IsEmail({}, { message: 'Некорректный адрес почты' })
  email: string;

  @ApiProperty({
    example: 'strong password',
    description: 'Пароль пользователя',
  })
  password: string;
}
