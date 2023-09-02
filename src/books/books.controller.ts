import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBook } from './dto/create-book.dto';
import { UpdateBook } from './dto/update-book.dto';
import { Books } from './books.model';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Получение списка всех книг' })
  @ApiResponse({ status: 200, type: [Books] })
  @Get()
  async getAllBooks(): Promise<Books[]> {
    return await this.booksService.getAllBooks();
  }

  @ApiOperation({ summary: 'Получение книги по айди' })
  @ApiResponse({ status: 200, type: Books })
  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<Books> {
    return await this.booksService.getBookById(id);
  }

  @ApiOperation({ summary: 'Создание новой книги' })
  @ApiResponse({ status: 200, type: Books })
  @Post()
  async createBook(@Body() dto: CreateBook): Promise<Books> {
    return await this.booksService.createBook(dto);
  }

  @ApiOperation({ summary: 'Обновление книги по айди' })
  @ApiResponse({ status: 200, description: 'Данные книги с id :id обновлены' })
  @Patch(':id')
  async updateBookById(
    @Param('id') id: number,
    @Body() dto: UpdateBook,
  ): Promise<string> {
    return await this.booksService.updateBookById(id, dto);
  }

  @ApiOperation({ summary: 'Удаление книги по айди' })
  @ApiResponse({ status: 200, description: 'Книга удалена успешно' })
  @Delete(':id')
  async deleteBookById(@Param('id') id: number): Promise<string> {
    return await this.booksService.deleteBookById(id);
  }
}
