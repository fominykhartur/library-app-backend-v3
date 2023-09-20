import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AddBookToUser {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор книги',
  })
  @IsNumber({}, { message: 'ID книги должен быть числом' })
  bookId: number;

  @ApiProperty({
    description: 'Статус книги - прочитан/не прочитано',
    example: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Статус должен быть булевым значением' })
  status?: boolean;
}
