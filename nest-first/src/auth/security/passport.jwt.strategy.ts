import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Payload } from './payload.interface';

//2. JWTStrategy 실행 (토큰 검증, payload추출)
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //요청 헤더에서 jwt 추출
      ignoreExpiration: true,
      secretOrKey: 'SECRET_KEY',
    });
  }

  // 3.validate(payload) 실행
  // jwt가 정상일때 실행되는 함수
  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    //user조회
    const user = await this.authService.tokenValidationUser(payload);
    if (!user) {
      return done(
        new UnauthorizedException({ message: 'user does not exist' }), // -> 사용자없으면 401에러
      );
    }

    return done(null, user); //Request객체에 user를 넘겨줌 => controller에서 @Get() user
  }
}
