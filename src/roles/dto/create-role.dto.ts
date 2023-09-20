import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRole {
  @ApiProperty({ example: 'USER', description: 'Название роли' })
  @IsString({ message: 'Название роли должно быть строкой' })
  name: string;
}
