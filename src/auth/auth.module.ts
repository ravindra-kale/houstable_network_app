import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRATE_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtService, AuthService, ConfigService],
})
export class AuthModule {}
