import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_authority') //테이블명: user_authority
export class UserAuthority {
  @PrimaryGeneratedColumn() //pk
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'authority_name' })
  authorityName: string;

  /**
   *  JOIN
   *  ManyToOne/OneToMany
   *
   *  1:N 관계
   */
  @ManyToOne(() => User, (user) => user.authorities)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
