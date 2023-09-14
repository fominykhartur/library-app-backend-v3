import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './categories.model';
import { createCategory } from './dto/create-category.dto';
import { CATEGORY_EXISTS } from './categories.constants';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories) private categoriesRepository: typeof Categories,
  ) {}

  async getCategories(): Promise<Categories[]> {
    return await this.categoriesRepository.findAll();
  }

  async createCategory(dto: createCategory) {
    const category = this.categoriesRepository.findOne({
      where: { name: dto.name },
    });
    if (category) {
      throw new HttpException(CATEGORY_EXISTS, HttpStatus.BAD_REQUEST);
    }
    return await this.categoriesRepository.create(dto);
  }
}
