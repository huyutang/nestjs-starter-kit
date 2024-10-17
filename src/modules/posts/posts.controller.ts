import {
  Body, ClassSerializerInterceptor,
  Controller, Delete, ForbiddenException,
  Get,
  Headers,
  Param, ParseIntPipe,
  Post, SetMetadata, UseGuards, UseInterceptors, UsePipes, ValidationPipe
} from "@nestjs/common";
import { PostService } from "./post.service";
import { Roles } from "../../core/decorators/roles.decorator";
import { LogginInterceptor } from "../../core/interceptors/loggin/loggin.interceptor";
import { TransformInterceptor } from "../../core/interceptors/transform/transform.interceptor";
import { ErrorsInterceptor } from "../../core/interceptors/errors/errors.interceptor";
import { PostsModule } from "./posts.module";
import { Post as PostEntity } from "./post.entity";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../../core/decorators/user.decorator";

@Controller("posts")
// @UseFilters(DemoFilter)
export class PostsController {


  constructor(private readonly postService: PostService) {

  }

  @Get()
  @UseInterceptors(ErrorsInterceptor)
  @UseInterceptors(ClassSerializerInterceptor)
  async get(@Headers() headers): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }


  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param("id", ParseIntPipe) id): Promise<PostEntity> {
    return await this.postService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  // @SetMetadata("roles", ["admin"])
  @Roles("admin")
  async store(@Body() body: PostEntity, @User() user): Promise<PostEntity> {
    console.log("executed post", body);
    return await this.postService.create({...body, user });
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(ClassSerializerInterceptor)
  async vote(@Param("id") id: number, @User() user) {
    return await this.postService.vote(id, user);
  }

  @Delete(':id/vote')
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(ClassSerializerInterceptor)
  async unVote(@Param("id") id: number, @User() user) {
    return await this.postService.unVote(id, user);
  }

  @Get(':id/voted')
  // @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(ClassSerializerInterceptor)
  async voted(@Param("id") id: number) {
    return await this.postService.voted(id);
  }

}
