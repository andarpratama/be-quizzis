// src/users/user.entity.ts
import { Quiz } from 'src/features/quiz/entities/quiz.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, OneToMany } from 'typeorm';

@Entity('users')
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: ['basic', 'admin', 'superadmin'],
    default: 'basic',
  })
  role: string;

  @OneToMany(() => Quiz, (quiz) => quiz.user) // Define the reverse relationship here
  quizzes: Quiz[]
  // Add other columns and relationships as needed
}
