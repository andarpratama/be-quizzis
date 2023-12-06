import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './configs/database-config';
import { Connection } from 'typeorm';
import { Logger } from '@nestjs/common';
import { QuizModule } from './features/quiz/quiz.module';
import { UserModule } from './features/user/user.module';
import { QuestionModule } from './features/question/question.module';
import { AnswerModule } from './features/answer/answer.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    QuizModule,
    UserModule,
    QuestionModule,
    AnswerModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      const isConnected = await this.connection.isConnected;
      if (isConnected) {
        this.logger.log('Database connected!');
      } else {
        this.logger.error('Database connection failed.');
      }
    } catch (error) {
      this.logger.error('Database connection error:', error);
    }
  }
}
