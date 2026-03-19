import { AuthService } from './auth.service';
import {
  Body,
  Post,
  Req,
  Res,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import type { Response } from 'express';
import { AuthGuard } from './security/auth.guard';
import type { Payload } from './security/payload.interface';
import type { AuthenticatedRequest } from './security/authenticated-request';

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
  async login(@Body() user: UserDTO, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(user);
    res.setHeader('Authorization', 'Bearer ' + jwt?.accessToken);
    return res.json(jwt);
  }

  @Get('authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: AuthenticatedRequest): Payload {
    const user = req.user;
    return user;
  }
}
