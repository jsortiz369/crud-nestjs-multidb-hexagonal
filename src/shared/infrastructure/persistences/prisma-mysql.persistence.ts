import { LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from 'generated/mysql/prisma';
import { MatchModeType } from 'src/shared/domain/interfaces';
import { EnvRepository } from 'src/shared/domain/repositories';

export type FiledType =
  | { value: string; type: 'string' | 'number' | 'boolean' | 'Date' }
  | { value: string; type: 'enum'; callback: (value: string) => string | undefined };

export type FilterType = {
  value: string;
  matchMode: MatchModeType;
};

export class PrismaMysqlPersistence extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly _logger: LoggerService,
    private readonly _envRepository: EnvRepository,
  ) {
    super({ datasourceUrl: _envRepository.getUrlDataSource() });
  }

  async onModuleInit() {
    if (this._envRepository.get('DB_TYPE') !== 'mysql') return;

    try {
      await this.$connect();

      this._logger.log('Server prisma database connected');
    } catch (error) {
      this._logger.error('Error connecting to server prisma database');
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this._envRepository.get('DB_TYPE') !== 'mysql') return;
    await this.$disconnect();
  }

  globalFilter(field: FiledType, value: string) {
    if (field.type === 'enum') {
      const newValue = field.callback(value);
      if (newValue === undefined) return null;
      return { [field.value]: newValue };
    }

    if (field.type !== 'Date') return { [field.value]: { contains: value } };

    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);
    const hour = value.slice(11, 13);
    const minute = value.slice(14, 16);
    const second = value.slice(17, 19);

    if (!['-', ''].includes(value.slice(4, 5)) || !['-', ''].includes(value.slice(7, 8))) return null;
    if (value.slice(10, 11).trim() !== '' || ![':', ''].includes(value.slice(13, 14)) || ![':', ''].includes(value.slice(16, 17))) return null;

    let yearStart: string | undefined = undefined;
    let yearEnd: string | undefined = undefined;
    let monthStart: string | undefined = undefined;
    let monthEnd: string | undefined = undefined;
    let dateStart: string | undefined = undefined;
    let dateEnd: string | undefined = undefined;
    let hourStart: string | undefined = undefined;
    let hourEnd: string | undefined = undefined;
    let minuteStart: string | undefined = undefined;
    let minuteEnd: string | undefined = undefined;
    let secondStart: string | undefined = undefined;
    let secondEnd: string | undefined = undefined;

    if (/^\d+$/.test(year)) {
      if (Number(year) < 1 || Number(year) > 9999) return null;
      yearStart = (Number(year) >= 1 && Number(year) <= 9999 ? year : '1').padStart(4, '0');
      yearEnd = (Number(year) >= 1 && Number(year) <= 9999 ? year : '9999').padStart(4, '0');
    }

    if (/^\d+$/.test(month) || month === '') {
      if ((Number(month) < 1 || Number(month) > 12) && month !== '') return null;
      monthStart = (Number(month) >= 1 && Number(month) <= 12 ? month : '1').padStart(2, '0');
      monthEnd = (Number(month) >= 1 && Number(month) <= 12 ? month : '12').padStart(2, '0');
    }

    if (/^\d+$/.test(day) || day === '') {
      if ((Number(day) < 1 || Number(day) > 31) && day !== '') return null;
      dateStart = (Number(day) >= 1 && Number(day) <= 31 ? day : '1').padStart(2, '0');
      dateEnd = (Number(day) >= 1 && Number(day) <= 31 ? day : '31').padStart(2, '0');
    }

    if (/^\d+$/.test(hour) || hour === '') {
      if ((Number(hour) < 0 || Number(hour) > 23) && hour !== '') return null;
      hourStart = (Number(hour) >= 0 && Number(hour) <= 23 ? hour : '0').padStart(2, '0');
      hourEnd = (Number(hour) >= 0 && Number(hour) <= 23 && hour != '' ? hour : '23').padStart(2, '0');
    }

    if (/^\d+$/.test(minute) || minute === '') {
      if ((Number(minute) < 0 || Number(minute) > 59) && minute !== '') return null;
      minuteStart = (Number(minute) >= 0 && Number(minute) <= 59 ? minute : '0').padStart(2, '0');
      minuteEnd = (Number(minute) >= 0 && Number(minute) <= 59 && minute != '' ? minute : '59').padStart(2, '0');
    }

    if (/^\d+$/.test(second) || second === '') {
      if ((Number(second) < 0 || Number(second) > 59) && second !== '') return null;
      secondStart = (Number(second) >= 0 && Number(second) <= 59 ? second : '0').padStart(2, '0');
      secondEnd = (Number(second) >= 0 && Number(second) <= 59 && second != '' ? second : '59').padStart(2, '0');
    }

    if (!yearStart || !monthStart || !dateStart || !hourStart || !minuteStart || !secondStart) return null;
    return {
      [field.value]: {
        gte: new Date(`${yearStart}-${monthStart}-${dateStart}T${hourStart}:${minuteStart}:${secondStart}.000Z`),
        lte: new Date(`${yearEnd}-${monthEnd}-${dateEnd}T${hourEnd}:${minuteEnd}:${secondEnd}.999Z`),
      },
    };
  }

  fieldFilter(field: FiledType, filterType: FilterType) {
    if (field.type === 'string') return this.stringFilter(field.value, filterType);
    if (field.type === 'enum') return this.enumFilter(field, filterType);
    return null;
  }

  private stringFilter(field: string, filterType: FilterType) {
    if (filterType.matchMode === MatchModeType.NOT_EQUALS) return { [field]: { not: filterType.value } };
    if (filterType.matchMode === MatchModeType.NOT_CONTAINS) return { [field]: { not: { contains: filterType.value } } };
    return { [field]: { [filterType.matchMode]: filterType.value } };
  }

  private enumFilter(field: { value: string; callback: (value: string) => string | undefined }, filterType: FilterType) {
    if (filterType.matchMode === MatchModeType.NOT_EQUALS) {
      const newValue = field.callback(field.value);
      if (newValue === undefined || newValue === null) return null;
      return { [field.value]: { not: newValue } };
    }

    if (filterType.matchMode === MatchModeType.EQUALS) {
      const newValue = field.callback(field.value);
      if (newValue === undefined || newValue === null) return null;
      return { [field.value]: newValue };
    }

    return null;
  }
}
