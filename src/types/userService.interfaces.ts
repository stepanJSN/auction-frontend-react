import { Role } from '../enums/role.enum';

export interface ICreateUser {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export interface IUpdateUser extends Partial<ICreateUser> {}

export interface IUser {
  id: string;
  name: string;
  email: string;
  surname: string;
  rating: number;
  role: Role;
  balance: {
    available: number;
    total: number;
  };
  created_at: Date;
}
