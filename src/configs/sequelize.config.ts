import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Authors } from 'src/authors/authors.model';
import { Books } from 'src/books/books.model';
import { Categories } from 'src/categories/categories.model';
import { Roles } from 'src/roles/roles.model';
import { UsersBooks } from 'src/users-books/users-books.model';
import { User } from 'src/users/users.model';

export const getSequelizeCOnfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => {
  return {
    dialect: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    models: [User, Books, Authors, Categories, UsersBooks, Roles],
    autoLoadModels: true,
    sync: { force: false },
  };
};
