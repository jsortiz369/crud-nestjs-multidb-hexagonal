import * as i from '../../domain/database.interface';

export class PrismaUtil {
  /**
   * @description filter search is global for every fields
   * @date 2025-12-01 18:04:58
   * @author Jogan Ortiz Muñoz
   *
   * @static
   * @param {i.FiledSearchType} field
   * @param {string} value
   * @returns {(i.FilterEnum | i.FilterString | i.FilterDate | i.FilterBoolean | i.FilterNumber | null)}
   */
  static searchFilter(
    field: i.FiledSearchType,
    value: string,
  ): i.FilterEnum | i.FilterString | i.FilterDate | i.FilterBoolean | i.FilterNumber | null {
    if (field.type === 'enum') return this.filterEnum(field, i.MatchModeEnumType.EQUALS, value);
    if (field.type === 'string') return this.filterString(field, i.MatchModeStringType.EQUALS, value);
    if (field.type === 'Date') return this.filterDate(field, i.MatchModeDateType.LTE_GTE, value);
    if (field.type === 'boolean') return this.filterBoolean(field, i.MatchModeBooleanType.EQUALS, value);
    if (field.type === 'number') return this.filterNumber(field, i.MatchModeNumberType.EQUALS, value);
    return null;
  }

  /**
   * @description If the filter is by string
   * @date 2025-11-24 06:47:56
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {i.FiledSearchType} field
   * @param {string} value
   * @param {i.MatchModeStringType} matchMode
   * @returns {(i.FilterString | null)}
   */
  private static filterString(field: i.FiledSearchType, matchMode: i.MatchModeStringType, value: string): i.FilterString | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    if (matchMode === i.MatchModeStringType.EQUALS) return { [field.field]: fieldValue };
    if (matchMode === i.MatchModeStringType.CONTAINS) return { [field.field]: { contains: fieldValue } };
    if (matchMode === i.MatchModeStringType.STARTS_WITH) return { [field.field]: { startsWith: fieldValue } };
    if (matchMode === i.MatchModeStringType.ENDS_WITH) return { [field.field]: { endsWith: fieldValue } };
    if (matchMode === i.MatchModeStringType.NOT_CONTAINS) return { [field.field]: { not: { contains: fieldValue } } };
    if (matchMode === i.MatchModeStringType.NOT_EQUALS) return { [field.field]: { not: fieldValue } };
    if (matchMode === i.MatchModeStringType.IN) return { [field.field]: { in: fieldValue.split(',') } };

    return null;
  }

  /**
   * @description If the filter is by enum
   * @date 2025-11-24 06:43:02
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {i.FiledSearchType} field
   * @param {string} value
   * @param {i.MatchModeEnumType} matchMode
   * @returns {(i.FilterEnum | null)}
   */
  private static filterEnum(field: i.FiledSearchType, matchMode: i.MatchModeEnumType, value: string): i.FilterEnum | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    if (matchMode === i.MatchModeEnumType.NOT_EQUALS) return { [field.field]: { not: fieldValue } };
    if (matchMode === i.MatchModeEnumType.EQUALS) return { [field.field]: fieldValue };
    if (matchMode === i.MatchModeEnumType.IN) return { [field.field]: { in: fieldValue.split(',') } };
    return null;
  }

  /**
   * @description If the filter is by date
   * @date 2025-11-28 07:06:47
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {i.FiledSearchType} field
   * @param {i.MatchModeDateType} matchMode
   * @param {string} value
   * @returns {(i.FilterDate | null)}
   */
  private static filterDate(field: i.FiledSearchType, matchMode: i.MatchModeDateType, value: string): i.FilterDate | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    const dates = fieldValue.split(',');
    const dateValidate = this.isValidDate(dates[0], true);
    if (dateValidate === null) return null;
    if (matchMode === i.MatchModeDateType.EQUALS) return { [field.field]: dateValidate };
    if (matchMode === i.MatchModeDateType.LT) return { [field.field]: { lt: dateValidate } };
    if (matchMode === i.MatchModeDateType.GT) return { [field.field]: { gt: dateValidate } };
    if (matchMode === i.MatchModeDateType.LTE) return { [field.field]: { lte: dateValidate } };
    if (matchMode === i.MatchModeDateType.GTE) return { [field.field]: { gte: dateValidate } };
    if (matchMode === i.MatchModeDateType.NOT_EQUALS) return { [field.field]: { not: dateValidate } };

    const dateEndValidate = this.isValidDate(dates[1] || dates[0]);
    if (dateEndValidate === null) return null;
    if (matchMode === i.MatchModeDateType.LT_GT) return { [field.field]: { gt: dateValidate, lt: dateEndValidate } };
    if (matchMode === i.MatchModeDateType.LTE_GTE) return { [field.field]: { gte: dateValidate, lte: dateEndValidate } };

    const inDateValidate = dates.map((date) => this.isValidDate(date, true)).filter((date) => date !== null);
    if (matchMode === i.MatchModeDateType.IN) return { [field.field]: { in: inDateValidate } };
    return null;
  }

  /**
   * @description If the filter is by number
   * @date 2025-12-01 18:02:07
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {i.FiledSearchType} field
   * @param {i.MatchModeNumberType} matchMode
   * @param {string} value
   * @returns {(i.FilterNumber | null)}
   */
  private static filterNumber(field: i.FiledSearchType, matchMode: i.MatchModeNumberType, value: string): i.FilterNumber | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;
    const arrNumber = fieldValue.split(',');

    const numberValue = this.isValidNumber(arrNumber[0]);
    if (numberValue === null) return null;

    if (matchMode === i.MatchModeNumberType.EQUALS) return { [field.field]: numberValue };
    if (matchMode === i.MatchModeNumberType.LT) return { [field.field]: { lt: numberValue } };
    if (matchMode === i.MatchModeNumberType.GT) return { [field.field]: { gt: numberValue } };
    if (matchMode === i.MatchModeNumberType.LTE) return { [field.field]: { lte: numberValue } };
    if (matchMode === i.MatchModeNumberType.GTE) return { [field.field]: { gte: numberValue } };
    if (matchMode === i.MatchModeNumberType.NOT_EQUALS) return { [field.field]: { not: numberValue } };

    const numbers = arrNumber.map((num) => this.isValidNumber(num)).filter((num) => num !== null);
    if (matchMode === i.MatchModeNumberType.IN) return { [field.field]: { in: numbers } };
    return null;
  }

  /**
   * @description If the filter is by Boolean
   * @date 2025-12-01 18:02:37
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {i.FiledSearchType} field
   * @param {i.MatchModeBooleanType} matchMode
   * @param {string} value
   * @returns {(i.FilterBoolean | null)}
   */
  private static filterBoolean(field: i.FiledSearchType, matchMode: i.MatchModeBooleanType, value: string): i.FilterBoolean | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    const boolValue = this.isValidBoolean(fieldValue);
    if (boolValue === null) return null;

    if (matchMode === i.MatchModeBooleanType.EQUALS) return { [field.field]: boolValue };
    if (matchMode === i.MatchModeBooleanType.NOT_EQUALS) return { [field.field]: { not: boolValue } };
    return null;
  }

  /**
   * @description Validate if string is Date
   * @date 2025-12-01 18:01:04
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {string} value
   * @param {boolean} [dateInit=false]
   * @returns {(Date | null)}
   */
  private static isValidDate(value: string, dateInit: boolean = false): Date | null {
    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);
    const hour = value.slice(11, 13);
    const minute = value.slice(14, 16);
    const second = value.slice(17, 19);

    // YYYY-MM-DD HH:MM:SS
    if (
      !['-', ''].includes(value.slice(4, 5)) ||
      !['-', ''].includes(value.slice(7, 8)) ||
      value.slice(10, 11).trim() !== '' ||
      ![':', ''].includes(value.slice(13, 14)) ||
      ![':', ''].includes(value.slice(16, 17))
    )
      return null;

    let yearValid: string | undefined = undefined;
    let monthValid: string | undefined = undefined;
    let dateValid: string | undefined = undefined;
    let hourValid: string | undefined = undefined;
    let minuteValid: string | undefined = undefined;
    let secondValid: string | undefined = undefined;

    if (/^\d+$/.test(year)) {
      if (Number(year) < 1 || Number(year) > 9999) return null;
      yearValid = (Number(year) >= 1 && Number(year) <= 9999 ? year : dateInit ? '1' : '9999').padStart(4, '0');
    }

    if (/^\d+$/.test(month) || month === '') {
      if ((Number(month) < 1 || Number(month) > 12) && month !== '') return null;
      monthValid = (Number(month) >= 1 && Number(month) <= 12 ? month : dateInit ? '1' : '12').padStart(2, '0');
    }

    if (/^\d+$/.test(day) || day === '') {
      if ((Number(day) < 1 || Number(day) > 31) && day !== '') return null;
      dateValid = (Number(day) >= 1 && Number(day) <= 31 ? day : dateInit ? '1' : '31').padStart(2, '0');
    }

    if (/^\d+$/.test(hour) || hour === '') {
      if ((Number(hour) < 0 || Number(hour) > 23) && hour !== '') return null;
      hourValid = (Number(hour) >= 0 && Number(hour) <= 23 && hour != '' ? hour : dateInit ? '0' : '23').padStart(2, '0');
    }

    if (/^\d+$/.test(minute) || minute === '') {
      if ((Number(minute) < 0 || Number(minute) > 59) && minute !== '') return null;
      minuteValid = (Number(minute) >= 0 && Number(minute) <= 59 && minute != '' ? minute : dateInit ? '0' : '59').padStart(2, '0');
    }

    if (/^\d+$/.test(second) || second === '') {
      if ((Number(second) < 0 || Number(second) > 59) && second !== '') return null;
      secondValid = (Number(second) >= 0 && Number(second) <= 59 && second != '' ? second : dateInit ? '0' : '59').padStart(2, '0');
    }

    if (!yearValid || !monthValid || !dateValid || !hourValid || !minuteValid || !secondValid) return null;
    return new Date(`${yearValid}-${monthValid}-${dateValid}T${hourValid}:${minuteValid}:${secondValid}.000Z`);
  }

  /**
   * @description Validate if string is booleand
   * @date 2025-12-01 17:58:51
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {string} value
   * @returns {(boolean | null)}
   */
  private static isValidBoolean(value: string): boolean | null {
    const boolValue = value.toLowerCase();
    if (boolValue === 'true') return true;
    if (boolValue === 'false') return false;
    return null;
  }

  /**
   * @description Validate if string is number
   * @date 2025-12-01 17:59:19
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {string} value
   * @returns {(number | null)}
   */
  private static isValidNumber(value: string): number | null {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return null;
    return numberValue;
  }
}
