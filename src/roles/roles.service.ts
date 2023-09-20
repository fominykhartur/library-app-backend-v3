import { Injectable } from '@nestjs/common';
import { Roles } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRole } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private rolesRepository: typeof Roles) {}

  async getRoles(): Promise<Roles[]> {
    return await this.rolesRepository.findAll();
  }

  async getRoleByName(name: string): Promise<Roles> {
    return await this.rolesRepository.findOne({ where: { name: name } });
  }

  async createRole(dto: CreateRole): Promise<Roles> {
    return await this.rolesRepository.create({ ...dto });
  }
}
