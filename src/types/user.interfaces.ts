import { IPagination } from './pagination.interface';

export interface ICreateUser {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export interface IUpdateUser extends Partial<Omit<ICreateUser, 'email'>> {}

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
  email: string;
  surname: string;
  rating: number;
}

export interface IGetUsersResponse {
  users: IUserSummary[];
  pagination: IPagination;
}

export interface IGetUserPayload {
  page: number;
  sortType?: 'creationDate' | 'rating';
  sortOrder?: 'asc' | 'desc';
  isAdmin?: boolean;
}
