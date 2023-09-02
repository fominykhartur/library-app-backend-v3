import { Module } from '@nestjs/common';
import { Categories } from './categories.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from 'src/books/books.model';

@Module({ imports: [SequelizeModule.forFeature([Categories, Books])] })
export class CategoriesModule {}
