import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findOneBy({ id });
  }

  async create(role: RoleDto): Promise<Role> {
    const entity = this.roleRepository.create(role);
    return await this.roleRepository.save(entity);
  }

  async update(id: number, role: Role): Promise<Role> {
    return await this.roleRepository.save({ id, ...role });
  }

  async delete(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    return await this.roleRepository.remove(role);
  }

  async findOneByName(name: string): Promise<Role> {
    return await this.roleRepository.findOneBy({ name });
  }
}
