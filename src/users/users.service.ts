import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UpdateUser } from './dto/update-user.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { USER_NOT_FOUND_BY_ID } from './users.constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
    }
    return user;
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
