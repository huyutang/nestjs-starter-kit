import { Role } from '../roles/role.entity';

export class UserDto {
  name: string;
  password: string;
  roles: Role[];
}

export class UpdatePasswordDto {
  password: string;
  newPassword: string;
}
