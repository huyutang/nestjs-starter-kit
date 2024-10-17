import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {
  }

  async findAll() {
    return await this.categoryRepository.find();
  }


  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }


  async create(data: CategoryDto) {
    const category = this.categoryRepository.create(data);
    return await this.categoryRepository.save(category);
  }

}
