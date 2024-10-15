export class UserDto {
  name: string;
  password: string;
}

export class UpdatePasswordDto {
  password: string;
  newPassword: string;
}