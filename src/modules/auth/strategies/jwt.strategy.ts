import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService) {
  //constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey-dfgsdleys25efdgsdfhsdfhsdhj'
    });
  }

  // todo check why this is required
  async authenticate(req: any, options?: any): Promise<any> {
    // 自定义认证逻辑
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      return this.fail('No auth token', 401);
    }
    // 进行token验证和用户信息提取
    // 如果成功，调用this.success('');
    // 如果失败，调用 this.fail(info, status)
    try {
      const payload = this.jwtService.verify(token);
      const user = {
        id: payload.id,
        name: payload.name
        // 添加其他需要的用户信息
      };
      console.log('user info:', user);

      const dbuser = await this.userService.findOneByName(user.name);
      if(!dbuser) {
        console.log('dbuser does not exist:', dbuser);
        throw new UnauthorizedException('用户不存在');
      }

      return this.success( user);
    } catch (error) {
      return this.fail('Invalid token', 401);
    }
  }


  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload:', payload);
    return {
      id: payload.id,
      name: payload.name
    };
  }
}