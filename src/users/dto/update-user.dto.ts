import { ApiProperty } from '@nestjs/swagger';

export class UpdateUser {
  @ApiProperty({ example: 'test@mail.com', description: 'email пользователя' })
  email?: string;
  @ApiProperty({ example: 'username', description: 'Имя пользователя' })
  username?: string;
}
