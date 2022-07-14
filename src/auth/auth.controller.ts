import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}
  @Get()
  async login(@Body() user: any) {
    const email = this.configService.get('USEREMAIL');
    const password = this.configService.get('PASSWORD');
    if (user.useremail == email && user.password == password) {
      return await this.authService.login(user);
    } else {
      return { massage: 'please correct username and password' };
    }
  }
}
