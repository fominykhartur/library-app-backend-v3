import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({ modelName: 'roles', timestamps: false })
export class Roles extends Model<Roles> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  @HasMany(() => User, {
    foreignKey: 'roleId',
    as: 'Role',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  id: number;

  @ApiProperty({ example: 'USER', description: 'Название роли' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
}
