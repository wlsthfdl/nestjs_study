import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthority } from './user-authority.entity';
import { ArticleEntity } from './article.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  //User는 여러개의 권한을 가진다.
  @OneToMany(() => UserAuthority, (userAuthority) => userAuthority.user, {
    eager: true,
  })
  authorities?: UserAuthority[];

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles?: ArticleEntity[];
}
