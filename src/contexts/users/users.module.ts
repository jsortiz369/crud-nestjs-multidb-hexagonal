import { Logger, Module } from '@nestjs/common';

import { UserRepository } from './domain/user.repository';
import { UserMysqlPersistence } from './infrastructure/persistences/user-mysql.persistence';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UuidModule } from 'src/shared/uuid/uuid.module';
import { EnvModule } from 'src/shared/env/env.module';
import { EnvRepository } from 'src/shared/env/domain/env.repository';
import { PrismaMysqlPersistence } from 'src/shared/database/infrastructure/persistences';
import { UuidRepository } from 'src/shared/uuid/domain/uuid.repository';

import * as useCases from './application';
import * as services from './domain/services';
import * as controllers from './infrastructure/http/controllers';

@Module({
  imports: [EnvModule, DatabaseModule, UuidModule],
  controllers: [
    controllers.UserCreateController,
    controllers.UserFindOneByIdController,
    controllers.UserDeleteController,
    controllers.UserUpdateController,
    controllers.UserFindController,
  ],
  providers: [
    Logger,
    {
      provide: UserRepository,
      useFactory: (_env: EnvRepository, persistence: PrismaMysqlPersistence) => {
        if (_env.get('NODE_ENV') == 'test') return null;
        const typeDb = _env.get('DB_TYPE');
        if (typeDb === 'postgresql') throw new Error('Postgres not implemented for UserRepository');
        if (typeDb === 'sqlserver') throw new Error('sqlserver not implemented for UserRepository');
        if (typeDb === 'mysql') return new UserMysqlPersistence(persistence);
        throw new Error('No persistence defined for UserRepository');
      },
      inject: [EnvRepository, PrismaMysqlPersistence],
    },
    {
      provide: services.UserExistByEmailService,
      useFactory: (userRepository: UserRepository) => new services.UserExistByEmailService(userRepository),
      inject: [UserRepository],
    },
    {
      provide: services.UserFindOneByIdService,
      useFactory: (userRepository: UserRepository) => new services.UserFindOneByIdService(userRepository),
      inject: [UserRepository],
    },
    {
      provide: useCases.UserCreateUserCase,
      useFactory: (uuidRepository: UuidRepository, existByEmailService: services.UserExistByEmailService, userRepository: UserRepository) =>
        new useCases.UserCreateUserCase(uuidRepository, existByEmailService, userRepository),
      inject: [UuidRepository, services.UserExistByEmailService, UserRepository],
    },
    {
      provide: useCases.UserFindOneByIdUseCase,
      useFactory: (userById: services.UserFindOneByIdService) => new useCases.UserFindOneByIdUseCase(userById),
      inject: [services.UserFindOneByIdService],
    },
    {
      provide: useCases.UserDeletedUseCase,
      useFactory: (userFindOneByIdService: services.UserFindOneByIdService, userRepository: UserRepository) =>
        new useCases.UserDeletedUseCase(userFindOneByIdService, userRepository),
      inject: [services.UserFindOneByIdService, UserRepository],
    },
    {
      provide: useCases.UserUpdateUseCase,
      useFactory: (
        userFindOneByIdService: services.UserFindOneByIdService,
        existByEmailService: services.UserExistByEmailService,
        userRepository: UserRepository,
      ) => new useCases.UserUpdateUseCase(userFindOneByIdService, existByEmailService, userRepository),
      inject: [services.UserFindOneByIdService, services.UserExistByEmailService, UserRepository],
    },
    {
      provide: useCases.UserFindUseCase,
      useFactory: (userRepository: UserRepository) => new useCases.UserFindUseCase(userRepository),
      inject: [UserRepository],
    },
  ],
})
export class UsersModule {}
