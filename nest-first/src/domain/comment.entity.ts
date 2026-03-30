import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ArticleEntity } from './article.entity';

@Entity('Comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'int', nullable: true })
  parentId?: number | null;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: 'userId' }) //typeORM이 fk(user_id)컬럼을 자동생성
  user: User;

  @ManyToOne(() => ArticleEntity, (article) => article.comment)
  @JoinColumn({ name: 'articleId' })
  article: ArticleEntity;
}
