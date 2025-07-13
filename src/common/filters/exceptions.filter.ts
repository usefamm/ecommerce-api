import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('Exceptions');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(
      `❌ ${request.method} ${request.url} -> Status ${status} - Error: ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      statusCode: status,
      path: request.url,
      error: message,
    });
  }
}
