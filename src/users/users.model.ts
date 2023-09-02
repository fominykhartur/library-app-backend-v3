import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'users' })
export class User extends Model<User> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'test@mail.com', description: 'email пользователя' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: '$2a$05$aQhaFBZQ.IPgrmk3zW5ajO.yYApuJwRvcv357I2Bnc0ZEe8COpiZa',
    description: 'Захэшированный пароль',
  })
  @Column({
    type: DataType.STRING,
  })
  passwordHashed: string;

  @ApiProperty({ example: 'username', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
  })
  username: string;
}
