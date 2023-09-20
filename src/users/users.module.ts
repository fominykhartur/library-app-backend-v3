import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersBooks } from 'src/users-books/users-books.model';
import { UsersBooksModule } from 'src/users-books/users-books.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UsersBooks]),
    forwardRef(() => AuthModule),
    UsersBooksModule,
    BooksModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
