import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthor {
  @ApiProperty({ description: 'Имя автора', example: 'С. Иванов' })
  name!: string;
}
