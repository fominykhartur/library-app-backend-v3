import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UpdateUser } from './dto/update-user.dto';
import { USER_NOT_FOUND } from '../auth/auth.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async updateUserById(id: number, dto: UpdateUser) {
    return await this.userRepository.update({ ...dto }, { where: { id: id } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async createUser(dto: AuthDto): Promise<User> {
    return await this.userRepository.create({
      email: dto.email,
      passwordHashed: dto.password,
      username: `username-${Math.random().toString().slice(2, 9)}`,
    });
  }
}
