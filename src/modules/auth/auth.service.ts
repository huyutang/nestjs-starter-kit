import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(data: LoginDto) {
    const {name, password} = data;
    const user = await this.userService.findOneByName(data.name);
    if (user) {
      if (!(await user.comparePassword(password))) {
        const {id} = user;
        const payload = { id,  name};
        const token = this.signToken(payload);

        return {...payload, token };
      } else {
        throw new UnauthorizedException('用户名或密码错误');
      }
    } else {
      throw new UnauthorizedException('用户名或密码错误');
    }
  }

  signToken(data: JwtPayload) {
    return this.jwtService.sign(data);
  }

}
