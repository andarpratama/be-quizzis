import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(User) // Inject the User repository
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { quiz_id: id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { user_id } = createQuizDto;
    const userExists = await this.checkIfUserExists(user_id);

    if (!userExists) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    console.log(createQuizDto)

    // Continue with quiz creation
    const newQuiz = this.quizRepository.create(createQuizDto);
    return this.quizRepository.save(newQuiz);
  }

  async checkIfUserExists(userId: number): Promise<boolean> {
    // Use the userRepository to check if a user with the specified userId exists
    const user = await this.userRepository.findOne({ where: { user_id: userId } });

    // If user is found, return true; otherwise, return false
    return !!user;
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.findOne(id);
    this.quizRepository.merge(quiz, updateQuizDto);
    return this.quizRepository.save(quiz);
  }

  async remove(id: number): Promise<void> {
    const quiz = await this.findOne(id);
    await this.quizRepository.remove(quiz);
  }
}
