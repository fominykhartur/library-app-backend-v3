import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRole } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles.model';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Получение всех ролей' })
  @ApiResponse({ status: HttpStatus.OK, type: [Roles] })
  @Get('')
  async getRoles(): Promise<Roles[]> {
    return await this.rolesService.getRoles();
  }

  @ApiOperation({ summary: 'Получение роли по имени' })
  @ApiResponse({ status: HttpStatus.OK, type: Roles })
  @Get(':roleName')
  async getRoleByName(@Param('roleName') roleName: string): Promise<Roles> {
    return await this.rolesService.getRoleByName(roleName);
  }

  @ApiOperation({ summary: 'Добавление новой роли' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Roles })
  @Post()
  async createRole(@Body() dto: CreateRole): Promise<Roles> {
    return await this.rolesService.createRole(dto);
  }
}
