import { MatchModeStringType, RoleType, SortOrderType, StatusType } from 'src/shared/domain/interfaces';
import * as vo from './vo';

export interface UserPrimitive {
  id: string;
  firstName: string;
  secondName?: string | null;
  firstSurname: string;
  secondSurname?: string | null;
  birthday: Date;
  phone?: string | null;
  email: string;
  photo?: string | null;
  password?: string;
  status: StatusType;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface UserCreate {
  firstName: string;
  secondName?: string;
  firstSurname: string;
  secondSurname?: string;
  birthday: Date;
  phone?: string;
  email: string;
  password: string;
  role: RoleType;
  status: StatusType;
}

export interface UserVO {
  id: vo.UserId;
  firstName: vo.UserFirstName;
  secondName: vo.UserSecondName;
  firstSurname: vo.UserFirstSurname;
  secondSurname: vo.UserSecondSurname;
  birthday: vo.UserBirthday;
  phone: vo.UserPhone;
  email: vo.UserEmail;
  photo: vo.UserPhoto;
  password: vo.UserPassword;
  status: vo.UserStatus;
  role: vo.UserRole;
  createdAt: vo.UserCreatedAt;
  updatedAt: vo.UserUpdatedAt;
  deletedAt: vo.UserDeletedAt;
}

export interface UserCreateVo {
  id: vo.UserId;
  firstName: vo.UserFirstName;
  secondName?: vo.UserSecondName;
  firstSurname: vo.UserFirstSurname;
  secondSurname?: vo.UserSecondSurname;
  birthday: vo.UserBirthday;
  phone?: vo.UserPhone;
  email: vo.UserEmail;
  password: vo.UserPassword;
  role: vo.UserRole;
  status: vo.UserStatus;
}

export enum UserSort {
  FIRST_NAME = 'firstName',
  SECON_DNAME = 'secondName',
  FIRST_SURNAME = 'firstSurname',
  SECOND_SURNAME = 'secondSurname',
  BIRTHDAY = 'birthday',
  PHONE = 'phone',
  EMAIL = 'email',
  STATUS = 'status',
  ROLE = 'role',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export interface UserFilterFind {
  global?: { value: string; matchMode: MatchModeStringType };
}

export interface UserFind {
  page: number;
  limit: number;
  sort: UserSort;
  sortOrder: SortOrderType;
  filters?: UserFilterFind;
  search?: string;
}
