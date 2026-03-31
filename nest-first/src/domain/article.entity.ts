import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { CommentEntity } from './comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'userId' }) //typeORM이 fk(user_id)컬럼을 자동생성
  user: User;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comment?: CommentEntity[];
}
