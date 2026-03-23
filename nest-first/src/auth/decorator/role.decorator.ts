import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../role-type';

/** Decorator **
 *
 *  함수에 "추가정보(메타데이터)"를 붙이는 방법
 *  ex) @Controller(), @Get(), @Post()
 *  @Roles('ROLE_ADMIN') <-- 이렇게 쓸 수 있게 만듦
 */
export const Roles = (...roles: RoleType[]): any => SetMetadata('roles', roles);
