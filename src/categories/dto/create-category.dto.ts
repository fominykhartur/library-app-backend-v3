import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createCategory {
  @ApiProperty({ description: 'Название категории', example: 'Фантастика' })
  @IsString({ message: 'Название категории должно быть строкой' })
  name: string;
}
