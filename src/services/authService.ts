import { api } from '../apiConfig';
import { Role } from '../enums/role.enum';
import {
  ISingInRequest,
  ISingInResponse,
} from '../types/authService.interfaces';

export const authService = {
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
  },

  signIn: async (data: ISingInRequest) => {
    const response = await api.post<ISingInResponse>('/auth/signin', data);

    console.log(response.data.accessToken);

    if (response.data.accessToken)
      authService.setAccessToken(response.data.accessToken);
    if (response.data.id) authService.setUserId(response.data.id);
    if (response.data.role) authService.setUserRole(response.data.role);

    return response.data;
  },

  setUserRole: (role: Role) => {
    localStorage.setItem('role', role);
  },

  setUserId: (id: string) => {
    localStorage.setItem('id', id);
  },

  getUserId: () => {
    return localStorage.getItem('id');
  },

  getUserRole: () => {
    return localStorage.getItem('role');
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  getNewTokens: () => {
    return api.get<{ accessToken: string }>('/auth/access-token');
  },

  clearStorage: () => {
    localStorage.clear();
  },

  logout: async () => {
    await api.get('/auth/logout');
    authService.clearStorage();
  },
};
