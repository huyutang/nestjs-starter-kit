import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() data: RoleDto) {
    return await this.roleService.create(data);
  }
}
