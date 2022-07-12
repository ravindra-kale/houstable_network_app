import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async tokenManager(@Body() user: any, @Res() res: Response) {
    const data = await this.authService.tokenManager(user, res);
    res.send(data);
  }
}
