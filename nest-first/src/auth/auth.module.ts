import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Module({
  //커스텀 Repository 삭제 -> 최신방식 User(Entity)넣으면 Nest가 자동으로 Repository<User> 생성해줌
  imports: [TypeOrmModule.forFeature([User])], //User 테이블을 사용하겠다
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
