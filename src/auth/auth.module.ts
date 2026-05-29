import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import type { SignOptions } from 'jsonwebtoken';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';

import { jwtConstants } from './constants';

const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ??
  '1d') as SignOptions['expiresIn'];

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtExpiresIn,
      },
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],

  exports: [JwtModule],
})
export class AuthModule {}
