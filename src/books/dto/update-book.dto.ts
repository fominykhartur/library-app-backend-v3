import { ApiProperty } from '@nestjs/swagger';

export class UpdateBook {
  @ApiProperty({
    example: 'Зов Припяти',
    description: 'Название книги',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор автора',
    required: false,
  })
  author?: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор категории',
    required: false,
  })
  category?: string;
}
