import { api } from '../apiConfig';
import { ISingInRequest, ISingInResponse } from '../types/authService.interfaces';

export const authService = {
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
  },

  signIn: async (data: ISingInRequest) => {
    const response = await api.post<ISingInResponse>(
      '/auth/signin',
      data,
    );

    if (response.data.accessToken) authService.setAccessToken(response.data.accessToken);

    return response.data;
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  getNewTokens: () => {
    return api.post<string>('/auth/access-token');
  },

  clearStorage: () => {
    localStorage.clear();
  },


  logout: async () => {
    await api.get('/auth/logout');
    authService.clearStorage();
  },
};
