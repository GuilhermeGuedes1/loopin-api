import { Post, Body, Controller, Get, UseGuards, Delete } from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SigninDTO, SignUpDTO } from './dtos/auth';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from './types/AuthenticatedUser';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Create a new account',
  })
  @ApiCreatedResponse({
    description: 'Account created successfully',
  })
  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @ApiOperation({
    summary: 'Authenticate user',
  })
  @ApiOkResponse({
    description: 'User authenticated successfully',
  })
  @Post('signin')
  async signin(@Body() body: SigninDTO) {
    return this.authService.signin(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get authenticated user',
  })
  @ApiOkResponse({
    description: 'Authenticated user fetched successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Get('me')
  getme(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.me(user.sub);
  }

  @ApiOperation({
    summary: 'Create demo account',
  })
  @ApiCreatedResponse({
    description: 'Demo account created successfully',
  })
  @Post('demo')
  async demo() {
    return this.authService.createDemoAccount();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete expired demo accounts',
  })
  @ApiOkResponse({
    description: 'Expired demo accounts deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Delete('demo/expired')
  async deleteExpiredDemos() {
    return this.authService.deleteExpiredDemoAccounts();
  }
}
