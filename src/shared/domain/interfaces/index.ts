import z from 'zod';
import { schemaEnv } from 'src/shared/infrastructure/schemas';

export type Env = z.infer<typeof schemaEnv>;

export enum StatusType {
  INACTIVE = '0',
  ACTIVE = '1',
}

export enum RoleType {
  USER = '0',
  ADMIN = '1',
}

export enum SortOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

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
  LTE = 'lte',
  GTE = 'gte',
  NOT_EQUALS = 'notEquals',
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

type Page = { page: number };

type MetaQuery = Page & {
  total: number;
  filter: number | undefined;
  lastPage: number;
};

export type DataFind<T> = {
  data: T[];
  meta: MetaQuery;
};

export type FiledSearchType = {
  field: string;
  type: 'string' | 'number' | 'boolean' | 'Date' | 'enum';
  callback?: (value: string) => string | undefined;
};
