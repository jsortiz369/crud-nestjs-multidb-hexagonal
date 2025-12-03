import { Module } from '@nestjs/common';

import { HttpModule } from './http/http.module';
import { ContextsModule } from '../contexts/contexts.module';
import { EnvModule } from 'src/shared/env/env.module';

@Module({
  imports: [EnvModule, HttpModule, ContextsModule],
})
export class AppModule {}
