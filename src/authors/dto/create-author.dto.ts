import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthor {
  @ApiProperty({ description: 'Имя автора', example: 'С. Иванов' })
  @IsString({ message: 'Имя автора должно быть строкой' })
  name: string;
}
