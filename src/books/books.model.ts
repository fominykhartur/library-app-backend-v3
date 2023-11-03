import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Authors } from '../authors/authors.model';
import { Categories } from '../categories/categories.model';
import { UsersBooks } from '../users-books/users-books.model';

@Table({ modelName: 'books' })
export class Books extends Model<Books> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @HasMany(() => UsersBooks, {
    foreignKey: 'bookId',
    as: 'Book',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  id: number;

  @ApiProperty({ example: 'Зов Припяти', description: 'Название книги' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор автора' })
  @Column({
    type: DataType.INTEGER,
  })
  @BelongsTo(() => Authors, {
    foreignKey: 'authorId',
    as: 'Author',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  authorId: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор категории',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @BelongsTo(() => Categories, {
    foreignKey: 'categoryId',
    as: 'Category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  categoryId: number;
}
