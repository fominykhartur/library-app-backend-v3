import { Module } from '@nestjs/common';
import { Authors } from './authors.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from '../books/books.model';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [SequelizeModule.forFeature([Authors, Books])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
