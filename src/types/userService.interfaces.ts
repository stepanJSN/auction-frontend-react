export interface ICreateUser {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export interface IUpdateUser extends Partial<ICreateUser> {}
