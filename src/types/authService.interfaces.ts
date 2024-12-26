import { Role } from '../enums/role.enum';

export interface ISingInRequest {
  email: string;
  password: string;
}

export interface ISingInResponse {
  accessToken: string;
  id: string;
  role: Role;
}
