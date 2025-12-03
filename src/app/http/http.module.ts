import { Logger, Module } from '@nestjs/common';

import * as filters from './filters';
import * as interceptors from './interceptors';

@Module({
  providers: [Logger, filters.HttpExceptionFilter, interceptors.MultipartBodyInterceptor],
  exports: [filters.HttpExceptionFilter, interceptors.MultipartBodyInterceptor],
})
export class HttpModule {}
