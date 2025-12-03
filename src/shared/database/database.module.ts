import { Logger, LoggerService, Module } from '@nestjs/common';

import { EnvModule } from '../env/env.module';
import { PrismaMysqlPersistence, PrismaPostgresqlPersistence, PrismaSqlServerPersistence } from './infrastructure/persistences/';
import { EnvRepository } from '../env/domain/env.repository';

@Module({
  imports: [EnvModule],
  providers: [
    Logger,
    {
      provide: PrismaMysqlPersistence,
      useFactory: (logger: LoggerService, envRepository: EnvRepository) => {
        if (envRepository.get('NODE_ENV') === 'test' || envRepository.get('DB_TYPE') !== 'mysql') return null;
        return new PrismaMysqlPersistence(logger, envRepository);
      },
      inject: [Logger, EnvRepository],
    },
    {
      provide: PrismaPostgresqlPersistence,
      useFactory: (logger: LoggerService, envRepository: EnvRepository) => {
        if (envRepository.get('NODE_ENV') === 'test' || envRepository.get('DB_TYPE') !== 'postgresql') return null;
        return new PrismaPostgresqlPersistence(logger, envRepository);
      },
      inject: [Logger, EnvRepository],
    },
    {
      provide: PrismaSqlServerPersistence,
      useFactory: (logger: LoggerService, envRepository: EnvRepository) => {
        if (envRepository.get('NODE_ENV') === 'test' || envRepository.get('DB_TYPE') !== 'sqlserver') return null;
        return new PrismaSqlServerPersistence(logger, envRepository);
      },
      inject: [Logger, EnvRepository],
    },
  ],
  exports: [PrismaMysqlPersistence, PrismaPostgresqlPersistence, PrismaSqlServerPersistence],
})
export class DatabaseModule {}
