// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsEnum, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 50)
  username: string;

  @IsEmail()
  @Length(8, 100)
  email: string;

  @IsString()
  @Length(4, 255)
  password: string;

  @IsEnum(['basic', 'admin', 'superadmin'])
  role: string;
}
