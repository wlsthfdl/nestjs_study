import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * JWT 토큰인증 (GUARD)
 * “이 요청에 JWT 토큰이 있고, 유효한지 검사하는 역할”
 * 컨트롤러 실행 전에 가로채서 허용 여부를 결정한다.
 *
 */
// 1. AuthGuard 실행: 요청에 토큰이 있는지 확인
@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  /** canActivate
   * true -> 요청 통과
   * false -> 요청 차단
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
