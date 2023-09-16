import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUser } from './dto/update-user.dto';
import { UsersBooksService } from 'src/users-books/users-books.service';
import { AddBookToUser } from 'src/users-books/dto/add-book-to-user.dto';
import { BooksService } from 'src/books/books.service';
import { ChangeStatus } from 'src/users-books/dto/change-status.dto';
import {
  USERBOOK_STATUS_CHANGED,
  USERBOOK_STATUS_DIDNT_CHANGED,
  USER_WITH_BOOK_NOT_FOUND,
} from 'src/users-books/users-books.constants';
import { User } from './users.model';
import { USER_EMAIL_IS_BUSY, USER_NOT_FOUND_BY_ID } from './users.constants';
import { UsersBooks } from 'src/users-books/users-books.model';
import { BOOK_NOT_FOUND } from 'src/books/books.constants';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private usersBooksService: UsersBooksService,
    private booksService: BooksService,
  ) {}

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get('')
  async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: USER_NOT_FOUND_BY_ID,
  })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.userService.getUserById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Обновление данных пользователя по его id' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: USER_EMAIL_IS_BUSY,
  })
  @Patch(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() dto: UpdateUser,
  ): Promise<string> {
    return await this.userService.updateUserById(id, dto);
  }

  @ApiOperation({ summary: 'Получение книг пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: [UsersBooks] })
  @Get(':id/books')
  async getUsersBooks(@Param('id') userId: number): Promise<UsersBooks[]> {
    return await this.usersBooksService.getUsersBooks(userId);
  }

  @ApiOperation({ summary: 'Добавление книги пользователю' })
  @ApiResponse({ status: HttpStatus.OK, type: UsersBooks })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: `${USER_NOT_FOUND_BY_ID} / ${BOOK_NOT_FOUND}`,
  })
  @Post(':id/books')
  async addBookToUser(
    @Param('id') userId: number,
    @Body() dto: AddBookToUser,
  ): Promise<UsersBooks> {
    await this.userService.getUserById(userId);
    await this.booksService.getBookById(dto.bookId);
    return await this.usersBooksService.addBookToUser(userId, dto);
  }

  @ApiOperation({ summary: 'Изменение статуса книги' })
  @ApiResponse({ status: HttpStatus.OK, description: USERBOOK_STATUS_CHANGED })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: USERBOOK_STATUS_DIDNT_CHANGED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: USER_WITH_BOOK_NOT_FOUND,
  })
  @Patch(':id/books/:bookId')
  async changeBookStatus(@Param() params: ChangeStatus): Promise<string> {
    return await this.usersBooksService.changeBookStatus(
      params.id,
      params.bookId,
    );
  }
}
