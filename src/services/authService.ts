import { api } from '../apiConfig';
import { ISingInRequest, ISingInResponse } from '../types/auth.interfaces';

export const authService = {
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
  },

  signIn: async (data: ISingInRequest) => {
    const response = await api.post<ISingInResponse>('/auth/signin', data);

    if (response.data.accessToken)
      authService.setAccessToken(response.data.accessToken);

    return response.data;
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  getNewTokens: async () => {
    return (await api.get<{ accessToken: string }>('/auth/access-token')).data;
  },

  clearStorage: () => {
    localStorage.clear();
  },

  logout: async () => {
    await api.get('/auth/logout');
    authService.clearStorage();
  },
};
