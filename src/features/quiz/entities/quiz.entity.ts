// src/quiz/quiz.entity.ts
import { User } from 'src/features/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('quizzes') // Specify the table name if it's different from the entity name
export class Quiz {
  @PrimaryGeneratedColumn()
  quiz_id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn({ name: 'user_id' }) // Specify the name of the foreign key column
  user: User;
}
