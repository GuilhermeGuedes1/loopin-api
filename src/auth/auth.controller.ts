import { Post, Body, Controller, Get, UseGuards, Delete } from '@nestjs/common';
import { SigninDTO, SignUpDTO } from './dtos/auth';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from './types/AuthenticatedUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SigninDTO) {
    return this.authService.signin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getme(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.me(user.sub);
  }

  @Post('demo')
  async demo() {
    return this.authService.createDemoAccount();
  }

  @Delete('demo/expired')
  async deleteExpiredDemos() {
    return this.authService.deleteExpiredDemoAccounts();
  }
}
