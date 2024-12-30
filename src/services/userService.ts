import { api, apiWithAuth } from '../apiConfig';
import { Role } from '../enums/role.enum';
import {
  ICreateUser,
  IGetUserPayload,
  IGetUsersResponse,
  IUpdateUser,
  IUser,
} from '../types/user.interfaces';

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

  getAll: async (payload: IGetUserPayload) => {
    const params = new URLSearchParams();
    params.append('page', payload.page.toString());
    if (payload.sortType) params.append('sortType', payload.sortType);
    if (payload.sortOrder) params.append('sortOrder', payload.sortOrder);
    if (payload.isAdmin) params.append('isAdmin', payload.isAdmin.toString());
    const users = await apiWithAuth.get<IGetUsersResponse>('/users', {
      params,
    });
    return users.data;
  },

  delete: async (id: string) => {
    await apiWithAuth.delete(`/users/${id}`);
  },
};
