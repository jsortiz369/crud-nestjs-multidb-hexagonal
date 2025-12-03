import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { MultipartFile } from '@fastify/multipart';
import { Observable, tap } from 'rxjs';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class MultipartBodyInterceptor implements NestInterceptor {
  constructor(private readonly _logger: Logger) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    const nextHandle = next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const duration = Date.now() - now;

        this._logger.log(`${req.method} ${req.url} ${statusCode} ${duration}ms`);
      }),
    );

    // check if request is multipart
    if (!req.isMultipart || !req.isMultipart()) return nextHandle;

    const files: MultipartFile[] = [];
    try {
      for await (const part of req.parts()) {
        if (part.type === 'file') {
          files.push(part);
          await part.toBuffer();
        } else if (part.type === 'field') {
          if (req.body === undefined) req.body = {};
          req.body![part.fieldname] = part.value;
        }
      }
    } catch (error) {
      this._logger.error(`${req.method} ${req.url} ${error.message}`);
    }

    (req as any).files = files;
    (req as any).file = files.length ? files[0] : undefined;

    return nextHandle;
  }
}
