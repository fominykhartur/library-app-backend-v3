import { ApiProperty } from '@nestjs/swagger';

export class ChangeStatus {
  @ApiProperty({ description: 'id пользователя', example: 1 })
  id: number;
  @ApiProperty({ description: 'id книги', example: 1 })
  bookId: number;
}
