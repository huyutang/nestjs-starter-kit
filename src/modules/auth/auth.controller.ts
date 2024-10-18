import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt')) // will check user token
  // @UseInterceptors(ClassSerializerInterceptor)
  async test(@User() user, @Req() req) {
    // console.log('req:', req.user);
    console.log('user:', user);
    return {
      data: req.user,
      user: user,
    };
  }
}
