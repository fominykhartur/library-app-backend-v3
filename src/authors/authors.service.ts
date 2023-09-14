import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Authors } from './authors.model';
import { CreateAuthor } from './dto/create-author.dto';
import { AUTHOR_EXISTS } from './authors.constants';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Authors) private authorsRepository: typeof Authors,
  ) {}

  async getAuthors(): Promise<Authors[]> {
    return await this.authorsRepository.findAll();
  }

  async createAuthor(dto: CreateAuthor): Promise<Authors> {
    const author = await this.authorsRepository.findOne({
      where: { name: dto.name },
    });
    if (author) {
      throw new HttpException(AUTHOR_EXISTS, HttpStatus.BAD_REQUEST);
    }
    return await this.authorsRepository.create(dto);
  }
}
