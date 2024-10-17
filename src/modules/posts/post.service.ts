import { Injectable } from "@nestjs/common";
import { Post } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post)
              private postRepository: Repository<Post>) {
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ["user"] });
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ["user"]
    });
  }

  async create(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  async vote(id: number, user: User) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(User, "voted")
      .of(user)
      .add(id);
  }

  async unVote(id: number, user: User) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(User, "voted")
      .of(user)
      .remove(id);
  }

  async voted(id: number) {
    console.log(id);
    return await this.postRepository
      .findOne(
        {
          where: { id },
          relations: ["voted"]
        }
      );
      // .createQueryBuilder()
      // .relation(Post, "voted")
      // .of(id)
      // .loadMany();
  }
}
