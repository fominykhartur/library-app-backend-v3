import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModule } from './books/books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { getSequelizeCOnfig } from './configs/sequelize.config';
import { UsersBooksModule } from './users-books/users-books.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeCOnfig,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    AuthorsModule,
    CategoriesModule,
    UsersBooksModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
