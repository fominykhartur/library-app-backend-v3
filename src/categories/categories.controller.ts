import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categories } from './categories.model';
import { createCategory } from './dto/create-category.dto';
import { CATEGORY_EXISTS } from './categories.constants';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({ status: HttpStatus.OK, type: [Categories] })
  @Get()
  async getCategories(): Promise<Categories[]> {
    return this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: 'Добавление новой категории' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Categories })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: CATEGORY_EXISTS })
  @Post()
  async createCategory(@Body() dto: createCategory) {
    return this.categoriesService.createCategory(dto);
  }
}
