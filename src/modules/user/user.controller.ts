import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdatePasswordDto, UserDto } from "./user.dto";
import { User } from "../../core/decorators/user.decorator";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

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

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param("id") id: number) {
    return await this.userService.findOne(id);
  }

  @Put(":id/password")
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Param("id") id: number, @Body() body: UpdatePasswordDto) {
    console.log(id, body);
    return await this.userService.updatePassword(id, body);
  }

  @Get(":id/voted")
  @UseInterceptors(ClassSerializerInterceptor)
  async voted(@Param("id") id: number) {
    return await this.userService.voted(id);
  }


}
