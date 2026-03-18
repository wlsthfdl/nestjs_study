import { AuthService } from './auth.service';
import { Body, Post, Req, Controller, Get } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  test() {
    return 'ok';
  }

  //회원가입
  @Post('register')
  async registerAccount(
    @Req() req: Request,
    @Body() UserDTO: UserDTO,
  ): Promise<any> {
    return await this.authService.registerUser(UserDTO);
  }

  //로그인
  @Post('login')
  async login(@Body() user: UserDTO): Promise<any> {
    return await this.authService.validateUser(user);
  }
}
