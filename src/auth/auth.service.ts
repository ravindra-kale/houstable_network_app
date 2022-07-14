import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: any) {
    console.log(user);
    const payload = { email: user.useremail, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // async verifyToken(token: string, @Res() res: Response) {
  //   try {
  //     const data = await this.jwtService.verify(token, {
  //       secret: process.env.SECRATE_KEY,
  //     });
  //     res.send(data);
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }
}
