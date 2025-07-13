import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const tick = statusCode < 400 ? '✅' : '❌';

      this.logger.log(`${tick} ${method} ${originalUrl} ${statusCode}`);
    });

    next();
  }
}
