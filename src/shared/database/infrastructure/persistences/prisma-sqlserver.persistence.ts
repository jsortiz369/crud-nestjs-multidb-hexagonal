import { LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaUtil } from '../utils';
import { EnvRepository } from 'src/shared/env/domain/env.repository';

export class PrismaSqlServerPersistence implements OnModuleInit, OnModuleDestroy {
  private readonly _logger: LoggerService;

  constructor(_logger: LoggerService, _envRepository: EnvRepository) {
    console.log(_envRepository);
    //super({ datasourceUrl: _envRepository.getUrlDataSource() });
    this._logger = _logger;
  }

  /**
   * @description Get Utils Prisma
   * @date 2025-12-02 21:47:52
   * @author Jogan Ortiz Muñoz
   *
   * @readonly
   * @type {PrismaUtil}
   */
  get $utls(): PrismaUtil {
    return PrismaUtil;
  }

  /**
   * @description Connect to database postgresql
   * @date 2025-12-02 21:48:42
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    try {
      //await this.$connect();
      throw new Error('Method not implemented.');

      this._logger.log('Server prisma database connected POSTGRESQL', 'DatabaseApplication');
    } catch (error) {
      this._logger.error('Error connecting to server prisma database', 'DatabaseApplication');
      throw error;
    }
  }

  /**
   * @description Disconnect to database postgresql
   * @date 2025-12-02 21:48:29
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @returns {Promise<void>}
   */
  async onModuleDestroy(): Promise<void> {
    //await this.$disconnect();
    throw new Error('Method not implemented.');
  }
}
