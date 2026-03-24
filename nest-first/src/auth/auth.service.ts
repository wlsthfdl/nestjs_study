import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/domain/user.entity';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //회원가입
  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind = await this.userService.findByFields({
      where: { username: newUser.username },
    });

    if (userFind) {
      throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
    }

    //유저 생성
    const user = new User();
    user.username = newUser.username;
    user.password = newUser.password;

    return await this.userService.save(user);
  }

  //로그인
  async validateUser(
    userDTO: UserDTO,
  ): Promise<{ accessToken: string } | null> {
    const userFind = await this.userService.findByFields({
      where: { username: userDTO.username },
    });

    //유저가 없습니다.
    if (!userFind) throw new UnauthorizedException('User not found');

    //비밀번호 유효성 체크
    const validatePassword = await bcrypt.compare(
      userDTO.password,
      userFind.password,
    );

    //비밀번호 예외처리
    if (!validatePassword) throw new UnauthorizedException();

    // jwt토큰
    /** HEADER.PRYLOAD.SIGNATURE
     * 헤더: 토큰의 타입과 암호화 알고리즘 정의
     * 페이로드: 토큰에 담길 정보를 넣음. iss, exp, sub 등
     * 시그니처: 헤더+페이로드+비밀키를 합쳐서 암호화한 것
     */
    this.convertInAuthorities(userFind);

    // JWT payload 생성
    const payload: Payload = {
      id: userFind.id,
      username: userFind.username,
      authorities: userFind.authorities,
    };

    //토큰 발급
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // 4. user조회
  async tokenValidationUser(payload: Payload): Promise<User | null> {
    //id로 유저 조회
    const userFind = await this.userService.findByFields({
      where: { id: payload.id },
    });
    if (!userFind) return null;
    return userFind;
  }

  private convertInAuthorities(user: User): User {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach((authority) => {
        authorities.push({ name: authority.authorityName });
      });
      user.authorities = authorities;
    }
    return user;
  }
}
