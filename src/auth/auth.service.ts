import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import {
  USER_EXISTS,
  USER_NOT_FOUND,
  USER_WRONG_PASSWORD,
} from 'src/auth/auth.constants';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthDto): Promise<User> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(USER_EXISTS, HttpStatus.BAD_REQUEST);
    }

    const passwordHashed = await hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: passwordHashed,
    });

    return user;
  }

  async login(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const verify = await compare(dto.password, user.passwordHashed);

    if (!verify) {
      throw new HttpException(USER_WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
    }

    return this.generateJWT(user);
  }

  async generateJWT(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return {
      token: await this.jwtService.signAsync(payload, { expiresIn: '24h' }),
    };
  }
}
