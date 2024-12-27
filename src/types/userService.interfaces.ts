export interface ICreateUser {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export interface IUpdateUser extends Partial<Omit<ICreateUser, 'email'>> {}

export interface IUser {
  name: string;
  email: string;
  surname: string;
  rating: number;
  balance: {
    available: number;
    total: number;
  };
  created_at: Date;
}
