import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Books } from 'src/books/books.model';

@Table({ modelName: 'categories' })
export class Categories extends Model<Categories> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор категории',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  @HasMany(() => Books, {
    foreignKey: 'categoryId',
    as: 'Category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  id: number;

  @ApiProperty({
    example: 'Фантастика',
    description: 'Название категории',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
}
