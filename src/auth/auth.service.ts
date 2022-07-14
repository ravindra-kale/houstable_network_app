import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: any) {
    const payload = { email: user.useremail, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
