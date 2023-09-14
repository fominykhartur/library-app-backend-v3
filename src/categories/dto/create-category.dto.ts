import { ApiProperty } from '@nestjs/swagger';

export class createCategory {
  @ApiProperty({ description: 'Название категории', example: 'Фантастика' })
  name!: string;
}
