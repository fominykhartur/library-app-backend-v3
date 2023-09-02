import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'test@mail.com', description: 'email пользователя' })
  email: string;

  @ApiProperty({
    example: 'strong password',
    description: 'Пароль пользователя',
  })
  password: string;
}
