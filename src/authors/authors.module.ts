import { Module } from '@nestjs/common';
import { Authors } from './authors.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from 'src/books/books.model';

@Module({ imports: [SequelizeModule.forFeature([Authors, Books])] })
export class AuthorsModule {}
