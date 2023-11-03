import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from './books.model';
import { Authors } from '../authors/authors.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Categories } from '../categories/categories.model';

@Module({
  imports: [SequelizeModule.forFeature([Books, Authors, Categories])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
