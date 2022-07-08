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
  async tokenManager(@Body() user: any, @Res() res: Response): Promise<string> {
    try {
      if (
        user.useremail == this.configService.get('USEREMAIL') &&
        user.password == this.configService.get('PASSWORD')
      ) {
        return await this.jwtService.sign(
          { user },
          this.configService.get('TOKEN_SECRATE_KEY'),
        );
      } else {
        res.send({ massege: 'Please check useremail and password' });
      }
    } catch (error) {
      res.send(error);
    }
  }
}
