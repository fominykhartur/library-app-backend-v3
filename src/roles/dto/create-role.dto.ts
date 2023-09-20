import { ApiProperty } from '@nestjs/swagger';

export class CreateRole {
  @ApiProperty({ example: 'USER', description: 'Название роли' })
  name: string;
}
