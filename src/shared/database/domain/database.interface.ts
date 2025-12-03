export enum MatchModeStringType {
  EQUALS = 'equals',
  CONTAINS = 'contains',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  NOT_CONTAINS = 'notContains',
  NOT_EQUALS = 'notEquals',
  IN = 'in',
}

export enum MatchModeNumberType {
  EQUALS = 'equals',
  LT = 'lt',
  GT = 'gt',
  LTE = 'lte',
  GTE = 'gte',
  NOT_EQUALS = 'notEquals',
  IN = 'in',
}

export enum MatchModeDateType {
  EQUALS = 'equals',
  LT = 'lt',
  GT = 'gt',
  LT_GT = 'ltGt',
  LTE = 'lte',
  GTE = 'gte',
  LTE_GTE = 'lteGte',
  NOT_EQUALS = 'notEquals',
  IN = 'in',
}

export enum MatchModeBooleanType {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
}

export enum MatchModeEnumType {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  IN = 'in',
}

export type FiledSearchType = {
  field: string;
  type: 'string' | 'number' | 'boolean' | 'Date' | 'enum';
  callback?: (value: string) => string | undefined;
};

export type FilterEnum = { [x: string]: string } | { [x: string]: { not: string } } | { [x: string]: { in: string[] } };

export type FilterString =
  | { [x: string]: string }
  | { [x: string]: { not: string } }
  | { [x: string]: { contains: string } }
  | { [x: string]: { startsWith: string } }
  | { [x: string]: { endsWith: string } }
  | { [x: string]: { not: { contains: string } } }
  | { [x: string]: { in: string[] } };

export type FilterDate =
  | { [x: string]: Date }
  | { [x: string]: { lt: Date } }
  | { [x: string]: { gt: Date } }
  | { [x: string]: { lte: Date } }
  | { [x: string]: { gte: Date } }
  | { [x: string]: { not: Date } }
  | { [x: string]: { gt: Date; lt: Date } }
  | { [x: string]: { gte: Date; lte: Date } }
  | { [x: string]: { in: Date[] } };

export type FilterBoolean = { [x: string]: boolean } | { [x: string]: { not: boolean } };

export type FilterNumber =
  | { [x: string]: number }
  | { [x: string]: { lt: number } }
  | { [x: string]: { gt: number } }
  | { [x: string]: { lte: number } }
  | { [x: string]: { gte: number } }
  | { [x: string]: { not: number } }
  | { [x: string]: { gt: number; lt: number } }
  | { [x: string]: { gte: number; lte: number } }
  | { [x: string]: { in: number[] } };
