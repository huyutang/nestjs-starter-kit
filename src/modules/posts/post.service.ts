import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from '../../core/interfaces/list-options/list-options.interface';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post)
              private postRepository: Repository<Post>) {
  }

  async findAll(options:ListOptionsInterface) {
    console.log('@@@', options);
    const {categories, page, limit } = options;
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    queryBuilder.leftJoinAndSelect('post.user', 'user');
    queryBuilder.leftJoinAndSelect('post.category', 'category');
    if (categories) {
      queryBuilder.where('category.alias in (:...categories)', { categories });
    }
    queryBuilder.orderBy('post.id', 'DESC');
    queryBuilder.take(limit).skip((page - 1) * limit);

    return await queryBuilder.getManyAndCount();

    //return await this.postRepository.find({ relations: ['user', 'category'] });

  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'category']
    });
  }

  async create(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  async vote(id: number, user: User) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .add(id);
  }

  async unVote(id: number, user: User) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .remove(id);
  }

  async voted(id: number) {
    console.log(id);
    return await this.postRepository
      .findOne(
        {
          where: { id },
          relations: ['voted']
        }
      );
      // .createQueryBuilder()
      // .relation(Post, 'voted')
      // .of(id)
      // .loadMany();
  }
}
