import { api, apiWithAuth } from '../apiConfig';
import { Role } from '../enums/role.enum';
import {
  ICreateUser,
  IUpdateUser,
  IUser,
} from '../types/userService.interfaces';

export const userService = {
  create: async (data: ICreateUser) => {
    await api.post('/users', data);
  },

  update: async (id: string, data: IUpdateUser) => {
    const userData = await apiWithAuth.put(`/users/${id}`, data);
    return userData.data;
  },

  changeRole: async (id: string, role: Role) => {
    await apiWithAuth.put(`/users/role`, { userId: id, role });
  },

  getOne: async (id: string) => {
    const userData = await apiWithAuth.get<IUser>(`/users/${id}`);
    return userData.data;
  },

  delete: async (id: string) => {
    await apiWithAuth.delete(`/users/${id}`);
  },
};
