import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UpdateUser } from './dto/update-user.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import {
  USER_EMAIL_IS_BUSY,
  USER_NOT_DETELED,
  USER_NOT_FOUND_BY_ID,
} from './users.constants';
import { Roles } from '../roles/roles.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({
      attributes: { exclude: ['passwordHashed'] },
      include: [Roles],
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id, {
      attributes: { exclude: ['passwordHashed'] },
      include: [Roles],
    });

    if (!user) {
      throw new HttpException(USER_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUserById(id: number, dto: UpdateUser) {
    await this.userRepository
      .update({ ...dto }, { where: { id: id } })
      .catch(() => {
        throw new HttpException(USER_EMAIL_IS_BUSY, HttpStatus.BAD_REQUEST);
      });

    return 'Данные пользователя успешно обновлены';
  }

  async deleteUserById(id: number) {
    const count = await this.userRepository.destroy({ where: { id: id } });
    if (count === 0) {
      throw new HttpException(USER_NOT_DETELED, HttpStatus.BAD_REQUEST);
    }
    return 'Пользователь успешно удален';
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
      include: [Roles],
    });
  }

  async createUser(dto: AuthDto, roleId?: number): Promise<User> {
    return await this.userRepository.create({
      email: dto.email,
      passwordHashed: dto.password,
      username: `username-${Math.random().toString().slice(2, 9)}`,
      roleId: roleId,
    });
  }
}
