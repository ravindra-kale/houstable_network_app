import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async tokenManager(@Body() user: any, @Res() res): Promise<string> {
    return await this.authService.tokenManager(user, res);
  }
}
