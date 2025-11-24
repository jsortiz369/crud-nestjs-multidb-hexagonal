import { Logger, Module } from '@nestjs/common';

import * as repositories from './domain/repositories';
import * as persistences from './infrastructure/persistences';
//import * as utils from './infrastructure/utils';

@Module({
  imports: [],
  providers: [
    Logger,
    {
      provide: repositories.EnvRepository,
      useClass: persistences.EnvPersistence,
    },
    {
      provide: repositories.UuidRepository,
      useClass: persistences.UuidPersistence,
    },
    {
      provide: persistences.PrismaMysqlPersistence,
      useFactory: (_logger: Logger, _env: repositories.EnvRepository) => new persistences.PrismaMysqlPersistence(Logger, _env),
      inject: [Logger, repositories.EnvRepository],
    },
  ],
  exports: [repositories.EnvRepository, repositories.UuidRepository, persistences.PrismaMysqlPersistence],
})
export class SharedModule {}
