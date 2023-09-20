import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Books } from './books.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBook } from './dto/create-book.dto';
import { UpdateBook } from './dto/update-book.dto';
import { Categories } from 'src/categories/categories.model';
import { Authors } from 'src/authors/authors.model';
import {
  BOOK_EXISTS,
  BOOK_NOT_DELETED,
  BOOK_NOT_FOUND,
} from './books.constants';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Books) private booksRepository: typeof Books) {}

  async getAllBooks(): Promise<Books[]> {
    const books = await this.booksRepository.findAll({
      include: [Categories, Authors],
    });
    return books;
  }

  async getBookById(id: number): Promise<Books> {
    const book = await this.booksRepository.findByPk(id, {
      include: [Categories, Authors],
    });

    if (!book) {
      throw new HttpException(BOOK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async createBook(dto: CreateBook): Promise<Books> {
    const book = await this.booksRepository.findOne({
      where: { name: dto.name },
    });
    if (book) {
      throw new HttpException(BOOK_EXISTS, HttpStatus.BAD_REQUEST);
    }
    return await this.booksRepository.create(dto);
  }

  async updateBookById(id: number, dto: UpdateBook): Promise<string> {
    await this.booksRepository.update({ ...dto }, { where: { id: id } });
    return `Данные книги с id ${id} обновлены`;
  }

  async deleteBookById(id: number): Promise<string> {
    const count = await this.booksRepository.destroy({ where: { id: id } });
    if (count === 0) {
      throw new HttpException(BOOK_NOT_DELETED, HttpStatus.BAD_REQUEST);
    }
    return 'Книга успешно удалена';
  }
}
