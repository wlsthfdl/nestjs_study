import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './security/passport.jwt.strategy';
import { UserAuthority } from 'src/domain/user-authority.entity';

@Module({
  //커스텀 Repository 삭제 -> 최신방식 User(Entity)넣으면 Nest가 자동으로 Repository<User> 생성해줌
  imports: [
    TypeOrmModule.forFeature([User, UserAuthority]), //User 테이블을 사용하겠다
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '300s' },
    }),
    PassportModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, jwtStrategy],
})
export class AuthModule {}
