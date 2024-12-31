import { Role } from '../enums/role.enum';
import { SortOrderEnum } from '../enums/sortOrder.enum';
import { IPagination } from './pagination.interface';

export interface ICreateUser {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export interface IUpdateUser extends Partial<Omit<ICreateUser, 'email'>> {}

export interface IUpdateUserRole {
  id: string;
  role: Role;
}

export interface IUserBalance {
  available: number;
  total: number;
}

export interface IUser {
  name: string;
  email: string;
  surname: string;
  rating: number;
  balance: IUserBalance;
  created_at: Date;
}

export interface IUserSummary {
  id: string;
  name: string;
  role: Role;
  surname: string;
  rating: number;
}

export interface IGetUsersResponse {
  data: IUserSummary[];
  info: IPagination;
}

export enum UsersSortTypeEnum {
  CREATION_DATE = 'creationDate',
  RATING = 'rating',
}

export interface IGetUserPayload {
  page?: number;
  sortType?: UsersSortTypeEnum;
  sortOrder?: SortOrderEnum;
  isAdmin?: boolean;
}
