import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PostMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.user = {
      roles: ['guest'],
    };

    //console.log('@@@', req.headers['x-auth-token'] === '123456')
    if (req.headers['x-auth-token'] === '123456') {
      req.user = {
        roles: ['admin'],
      };
    }

    next();
  }
}
