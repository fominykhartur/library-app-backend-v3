import { ApiProperty } from '@nestjs/swagger';

export class AddBookToUser {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор книги',
  })
  bookId: number;
  @ApiProperty({
    description: 'Статус книги - прочитан/не прочитано',
    example: false,
  })
  status?: boolean;
}
