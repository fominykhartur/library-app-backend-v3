import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeStatus {
  @ApiProperty({ description: 'id пользователя', example: 1 })
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  id: number;

  @ApiProperty({ description: 'id книги', example: 1 })
  @IsNumber({}, { message: 'ID книги должен быть числом' })
  bookId: number;
}
