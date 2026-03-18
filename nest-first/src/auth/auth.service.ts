import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  //회원가입
  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind = await this.userService.findByFields({
      where: { username: newUser.username },
    });

    if (userFind) {
      throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.username = newUser.username;
    user.password = newUser.password;

    return await this.userService.save(user);
  }

  //로그인
  async validateUser(userDTO: UserDTO): Promise<UserDTO | null> {
    const userFind = await this.userService.findByFields({
      where: { username: userDTO.username },
    });

    if (!userFind) return null;

    //비밀번호 유효성 체크
    const validatePassword = await bcrypt.compare(
      userDTO.password,
      userFind.password,
    );

    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }

    return userFind;
  }
}
