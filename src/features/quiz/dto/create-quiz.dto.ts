// src/quiz/dto/create-quiz.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class CreateQuizDto {
  @IsString({ message: 'The title must be a string.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'The description must be a string.' })
  description?: string;

  @IsInt({ message: 'The user_id must be an integer.' })
  @IsNotEmpty({ message: 'The user_id is required.' })
  user_id: number;
}
