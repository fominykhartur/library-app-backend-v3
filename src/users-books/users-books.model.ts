import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Books } from '../books/books.model';
import { User } from '../users/users.model';

@Table({ modelName: 'usersBooks' })
export class UsersBooks extends Model<UsersBooks> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.INTEGER,
  })
  @BelongsTo(() => User, {
    foreignKey: 'userId',
    as: 'User',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор книги',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @BelongsTo(() => Books, {
    foreignKey: 'bookId',
    as: 'Book',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  bookId: number;

  @ApiProperty({
    description: 'Статус книги - прочитан/не прочитано',
    example: false,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  status: boolean;
}
