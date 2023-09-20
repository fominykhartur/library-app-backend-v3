import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBook {
  @ApiProperty({ example: 'Зов Припяти', description: 'Название книги' })
  @IsString({ message: 'Название должно быть строкой' })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор автора',
    required: false,
  })
  @IsNumber({}, { message: 'ID автора должен быть числом' })
  authorId?: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор категории',
  })
  @IsNumber({}, { message: 'ID категории должен быть числом' })
  categoryId: number;
}
