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
