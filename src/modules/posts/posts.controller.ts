import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Roles } from '../../core/decorators/roles.decorator';
import { ErrorsInterceptor } from '../../core/interceptors/errors/errors.interceptor';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { ListOptions } from '../../core/decorators/list-options.decorator';
import { ListOptionsInterface } from '../../core/interfaces/list-options/list-options.interface';
import { TransformInterceptor } from '../../core/interceptors/transform/transform.interceptor';

@Controller('posts')
// @UseFilters(DemoFilter)
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseInterceptors(ErrorsInterceptor)
  @UseInterceptors(ClassSerializerInterceptor, TransformInterceptor)
  async listAll(@ListOptions({ limit: 5 }) options: ListOptionsInterface) {
    console.log('executed get', options);
    return await this.postService.findAll(options);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id', ParseIntPipe) id): Promise<PostEntity> {
    return await this.postService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  async store(@Body() body: PostEntity, @User() user): Promise<PostEntity> {
    console.log('executed post', body);
    return await this.postService.create({ ...body, user });
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async vote(@Param('id') id: number, @User() user) {
    return await this.postService.vote(id, user);
  }

  @Delete(':id/vote')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async unVote(@Param('id') id: number, @User() user) {
    return await this.postService.unVote(id, user);
  }

  @Get(':id/voted')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async voted(@Param('id') id: number) {
    return await this.postService.voted(id);
  }
}
