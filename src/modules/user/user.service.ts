import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdatePasswordDto, UserDto } from "./user.dto";
import { Role } from "../roles/role.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
              private userRepository: Repository<User>,
              @InjectRepository(Role)
              private roleRepository: Repository<Role>
  ) {
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

  async findOneByName(name: string) {
    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder.where("user.name = :name", { name });
    queryBuilder.leftJoinAndSelect("user.roles", "role");
    const user = await queryBuilder.getOne();

    if (!user) {
      throw new BadRequestException("用户不存在");
    }
    return user;

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


  async voted(id: number) {
    return await this.userRepository
      .findOne(
        {
          where: { id },
          relations: ["voted", "voted.user"]
        }
      );
  }

  async update(id: number, data: UserDto) {
    const { roles } = data;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException("用户不存在");
    }

    // Update roles relationship
    if (roles) {
      user.roles = await this.roleRepository.findBy({
        id: In(
          roles.map((role: Role) => role.id)
        )
      });
      console.log(user.roles);
    }

    // Save the updated user
    return this.userRepository.save(user);
  }

}
