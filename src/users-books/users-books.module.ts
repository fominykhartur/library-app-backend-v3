import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from 'src/books/books.model';
import { User } from 'src/users/users.model';
import { UsersBooks } from './users-books.model';

@Module({ imports: [SequelizeModule.forFeature([UsersBooks, User, Books])] })
export class UsersBooksModule {}
