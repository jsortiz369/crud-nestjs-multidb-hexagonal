import { Module } from '@nestjs/common';
import { EnvRepository } from './domain/env.repository';
import { ZodEnvPersistence } from './infrastructure/persistences';

@Module({
  providers: [
    {
      provide: EnvRepository,
      useClass: ZodEnvPersistence,
    },
  ],
  exports: [EnvRepository],
})
export class EnvModule {}
