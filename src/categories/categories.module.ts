import { Module } from '@nestjs/common';
import { Categories } from './categories.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from 'src/books/books.model';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({ imports: [SequelizeModule.forFeature([Categories, Books])], providers: [CategoriesService], controllers: [CategoriesController] })
export class CategoriesModule {}
