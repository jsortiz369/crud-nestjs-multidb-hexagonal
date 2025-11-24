import { FiledSearchType, MatchModeDateType, MatchModeEnumType, MatchModeStringType } from 'src/shared/domain/interfaces';

type FilterEnum = { [x: string]: string } | { [x: string]: { not: string } } | { [x: string]: { in: string[] } };
type FilterString =
  | { [x: string]: string }
  | { [x: string]: { contains: string } }
  | { [x: string]: { startsWith: string } }
  | { [x: string]: { endsWith: string } }
  | { [x: string]: { not: string } }
  | { [x: string]: { not: { contains: string } } }
  | { [x: string]: { in: string[] } };

export class PrismaUtils {
  static searchFilter(field: FiledSearchType, value: string) {
    if (field.type === 'enum') return this.filterEnum(field, MatchModeEnumType.EQUALS, value);
    if (field.type === 'string') return this.filterString(field, MatchModeStringType.EQUALS, value);
    //if (field.type === 'number') return this.filterNumber(field, value, MatchModeNumberType.EQUALS);
    if (field.type === 'Date') return this.filterDate(field, 'ltGt', value);
    return null;
  }

  /**
   * @description Validate filter string value
   * @date 2025-11-24 06:47:56
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {FiledSearchType} field
   * @param {string} value
   * @param {MatchModeStringType} matchMode
   * @returns {(FilterString | null)}
   */
  private static filterString(field: FiledSearchType, matchMode: MatchModeStringType, value: string): FilterString | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    if (matchMode === MatchModeStringType.EQUALS) return { [field.field]: fieldValue };
    if (matchMode === MatchModeStringType.CONTAINS) return { [field.field]: { contains: fieldValue } };
    if (matchMode === MatchModeStringType.STARTS_WITH) return { [field.field]: { startsWith: fieldValue } };
    if (matchMode === MatchModeStringType.ENDS_WITH) return { [field.field]: { endsWith: fieldValue } };
    if (matchMode === MatchModeStringType.NOT_CONTAINS) return { [field.field]: { not: { contains: fieldValue } } };
    if (matchMode === MatchModeStringType.NOT_EQUALS) return { [field.field]: { not: fieldValue } };
    if (matchMode === MatchModeStringType.IN) return { [field.field]: { in: fieldValue.split(',') } };

    return null;
  }

  /**
   * @description Validate filters enum value
   * @date 2025-11-24 06:43:02
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {FiledSearchType} field
   * @param {string} value
   * @param {MatchModeEnumType} matchMode
   * @returns {(FilterEnum | null)}
   */
  private static filterEnum(field: FiledSearchType, matchMode: MatchModeEnumType, value: string): FilterEnum | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    if (matchMode === MatchModeEnumType.NOT_EQUALS) return { [field.field]: { not: fieldValue } };
    if (matchMode === MatchModeEnumType.EQUALS) return { [field.field]: fieldValue };
    if (matchMode === MatchModeEnumType.IN) return { [field.field]: { in: fieldValue.split(',') } };
    return null;
  }

  private static filterDate(field: FiledSearchType, matchMode: MatchModeDateType | 'ltGt' | 'lteGte', value: string) {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

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
    const start = `${yearStart}-${monthStart}-${dateStart}T${hourStart}:${minuteStart}:${secondStart}.000Z`;
    const end = `${yearEnd}-${monthEnd}-${dateEnd}T${hourEnd}:${minuteEnd}:${secondEnd}.999Z`;
    if (matchMode === MatchModeDateType.EQUALS) return { [field.field]: { equals: { gte: new Date(start), lte: new Date(end) } } };
    if (matchMode === MatchModeDateType.LT) return { [field.field]: { lt: new Date(start) } };
    if (matchMode === MatchModeDateType.GT) return { [field.field]: { gt: new Date(start) } };
    if (matchMode === MatchModeDateType.LTE) return { [field.field]: { lte: new Date(start) } };
    if (matchMode === MatchModeDateType.GTE) return { [field.field]: { gte: new Date(start) } };
    if (matchMode === MatchModeDateType.NOT_EQUALS) return { [field.field]: { not: new Date(start) } };
    if (matchMode === 'ltGt') return { [field.field]: { gt: new Date(start), lt: new Date(end) } };
    if (matchMode === 'lteGte') return { [field.field]: { gte: new Date(start), lte: new Date(end) } };
    return null;
  }
}
