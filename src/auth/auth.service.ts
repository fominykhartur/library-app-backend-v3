import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async register(dto: AuthDto, roleName = 'USER'): Promise<User> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(USER_EXISTS, HttpStatus.BAD_REQUEST);
    }

    const role = await this.rolesService.getRoleByName(roleName);
    console.log(role.id);
    const passwordHashed = await hash(dto.password, 5);
    const user = await this.userService.createUser(
      {
        ...dto,
        password: passwordHashed,
      },
      role.id,
    );

    return user;
  }

  async login(dto: AuthDto): Promise<{ token: string }> {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const verify = await compare(dto.password, user.passwordHashed);

    if (!verify) {
      throw new HttpException(USER_WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
    }

    return this.generateJWT(user, user['Role'].name);
  }

  async generateJWT(user: User, roleName: string) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: roleName,
    };
    return {
      token: await this.jwtService.signAsync(payload, { expiresIn: '24h' }),
    };
  }
}
