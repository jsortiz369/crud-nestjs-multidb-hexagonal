import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly _logger: Logger) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const error: { message: string | string[] } = { message: 'error in server' };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      error.message = exception.getResponse()['message'] as string[];
    }

    this._logger.error(`${request.method} ${request.url} ${statusCode} ${exception.message}`);
    response.status(statusCode).send({ statusCode: statusCode, timestamp: new Date().toISOString(), error });
  }
}
