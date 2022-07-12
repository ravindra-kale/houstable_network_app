import { Body, HttpException, Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async tokenManager(@Body() user: any, @Res() res: Response) {
    const pass = this.configService.get('PASSWORD');
    const mail = this.configService.get('USEREMAIL');

    try {
      if (user.useremail == mail && user.password == pass) {
        const token = await this.jwtService.signAsync({ user });
        res.send(token);
      } else {
        res.send({ massege: 'Please check useremail and password' });
      }
    } catch (error) {
      res.send(error);
    }
  }
}
