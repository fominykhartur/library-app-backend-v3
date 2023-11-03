import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Books } from '../books/books.model';

@Table({ modelName: 'authors' })
export class Authors extends Model<Authors> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  @HasMany(() => Books, {
    foreignKey: 'authorId',
    as: 'Author',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  id: number;

  @ApiProperty({ example: 'С. Иванов', description: 'Имя автора' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
}
