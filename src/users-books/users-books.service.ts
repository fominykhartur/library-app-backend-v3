import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersBooks } from './users-books.model';
import { AddBookToUser } from './dto/add-book-to-user.dto';
import { Books } from '../books/books.model';
import {
  USERBOOK_STATUS_CHANGED,
  USERBOOK_STATUS_DIDNT_CHANGED,
  USER_ALREADY_HAS_BOOK,
  USER_WITH_BOOK_NOT_FOUND,
} from './users-books.constants';

@Injectable()
export class UsersBooksService {
  constructor(
    @InjectModel(UsersBooks) private usersBooksRepository: typeof UsersBooks,
  ) {}

  async getUsersBooks(userId: number): Promise<UsersBooks[]> {
    return await this.usersBooksRepository.findAll({
      where: { userId: userId },
      include: [Books],
    });
  }

  async addBookToUser(userId: number, dto: AddBookToUser): Promise<UsersBooks> {
    const userbook = await this.findBookByIds(userId, dto.bookId);
    if (userbook) {
      throw new HttpException(USER_ALREADY_HAS_BOOK, HttpStatus.BAD_REQUEST);
    }
    return await this.usersBooksRepository.create({ userId, ...dto });
  }

  async changeBookStatus(userId: number, bookId: number): Promise<string> {
    const userbook = await this.findBookByIds(userId, bookId);
    if (!userbook) {
      throw new HttpException(USER_WITH_BOOK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const result = await this.usersBooksRepository.update(
      { status: !userbook.status },
      { where: { id: userbook.id } },
    );
    if (result[0] !== 1) {
      throw new HttpException(
        USERBOOK_STATUS_DIDNT_CHANGED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return USERBOOK_STATUS_CHANGED;
  }

  async findBookByIds(userId: number, bookId: number): Promise<UsersBooks> {
    return await this.usersBooksRepository.findOne({
      where: { userId: userId, bookId: bookId },
    });
  }
}
