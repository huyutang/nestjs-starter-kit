import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto, UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async store(@Body() body: UserDto) {
    return await this.userService.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async listAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Param('id') id: number,
    @Body() body: UpdatePasswordDto,
  ) {
    console.log(id, body);
    return await this.userService.updatePassword(id, body);
  }

  @Get(':id/voted')
  @UseInterceptors(ClassSerializerInterceptor)
  async voted(@Param('id') id: number) {
    return await this.userService.voted(id);
  }

  // update role
  @Put(':id')
  @Roles('user')
  // 'jwt' is required to avoid TypeError: metatype is not a constructor
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
    return await this.userService.update(id, data);
  }
}
