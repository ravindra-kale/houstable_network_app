import { Injectable, Req, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(@Req() req, @Res() res): string {
    return res.send({ massage: 'ok' });
  }
}
