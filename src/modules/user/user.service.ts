import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdatePasswordDto, UserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
              private userRepository: Repository<User>) {
  }

  async create(body: UserDto) {
    const { name } = body;
    const user = await this.userRepository.findOneBy({ name });
    if (user) {
      throw new BadRequestException("用户已存在");
    }

    const userEntity = this.userRepository.create(body);
    return this.userRepository.save(userEntity);
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ["posts"]
    });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async updatePassword(id: number, data: UpdatePasswordDto) {
    console.log(data);
    const { password, newPassword } = data;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException("用户不存在");
    }

    if (!await user.comparePassword(password)) {
      throw new BadRequestException("密码错误");
    }

    user.password = newPassword;
    return await this.userRepository.update(id, user);
  }


  async findOneByName(name: string) {
    return await this.userRepository.findOneBy({ name });

  }

  async voted(id: number) {
    return await this.userRepository
      .findOne(
        {
          where: { id },
          relations: ["voted", "voted.user"]
        }
      );
  }
}
