// src/users/dto/update-user.dto.ts
import { IsString, IsEmail, IsEnum, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  username?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 255)
  password?: string;

  @IsOptional()
  @IsEnum(['basic', 'admin', 'superadmin'])
  role?: string;
}
