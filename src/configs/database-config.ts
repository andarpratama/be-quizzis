import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/features/user/entities/user.entity';
import { Quiz } from 'src/features/quiz/entities/quiz.entity';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Quiz],
  synchronize: process.env.DB_SYNCH === 'true',
};

export default databaseConfig;
