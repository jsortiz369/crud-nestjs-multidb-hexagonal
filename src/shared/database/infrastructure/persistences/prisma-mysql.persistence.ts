import { LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/mysql/prisma';

import { PrismaUtil } from '../utils';
import { EnvRepository } from 'src/shared/env/domain/env.repository';

export class PrismaMysqlPersistence extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly _logger: LoggerService;

  /**
   * Creates an instance of MysqlConnect.
   * @date 2025-12-02 06:45:11
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {LoggerService} _logger
   */
  constructor(_logger: LoggerService, _envRepository: EnvRepository) {
    super({ datasourceUrl: _envRepository.getUrlDataSource() });
    this._logger = _logger;
  }

  /**
   * @description Connect to database mysql
   * @date 2025-12-02 06:46:02
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();

      this._logger.log('Server prisma database connected MYSQL', 'DatabaseApplication');
    } catch (error) {
      this._logger.error('Error connecting to server prisma database', 'DatabaseApplication');
      throw error;
    }
  }

  /**
   * @description Disconnect to database mysql
   * @date 2025-12-02 06:46:15
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @returns {Promise<void>}
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  get $utls() {
    return PrismaUtil;
  }
}
