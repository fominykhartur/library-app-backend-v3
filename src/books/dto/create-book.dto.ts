import { ApiProperty } from '@nestjs/swagger';

export class CreateBook {
  @ApiProperty({ example: 'Зов Припяти', description: 'Название книги' })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор автора',
    required: false,
  })
  authorId?: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор категории',
  })
  categoryId: number;
}
