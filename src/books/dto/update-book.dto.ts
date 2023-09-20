import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBook {
  @ApiProperty({
    example: 'Зов Припяти',
    description: 'Название книги',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Название должно быть строкой' })
  name?: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор автора',
    required: false,
  })
  @IsOptional({})
  @IsNumber({}, { message: 'ID автора должен быть числом' })
  authorId?: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор категории',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'ID категории должен быть числом' })
  categoryId?: number;
}
