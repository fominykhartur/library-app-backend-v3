import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { Authors } from './authors.model';
import { CreateAuthor } from './dto/create-author.dto';
import { AUTHOR_EXISTS } from './authors.constants';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Получение всех авторов' })
  @ApiResponse({ status: HttpStatus.OK, type: [Authors] })
  @Get()
  async getAuthors(): Promise<Authors[]> {
    return await this.authorsService.getAuthors();
  }

  @ApiOperation({ summary: 'Добавление нового автора' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Authors })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: AUTHOR_EXISTS })
  @Post()
  async createAuthor(@Body() dto: CreateAuthor): Promise<Authors> {
    return await this.authorsService.createAuthor(dto);
  }
}
