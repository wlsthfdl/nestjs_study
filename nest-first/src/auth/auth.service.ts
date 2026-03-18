import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(newUser: UserDTO): Promise<User> {
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
}
