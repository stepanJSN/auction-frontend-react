import { api } from '../apiConfig';
import { ISingInRequest, ISingInResponse } from './authService.interfaces';
class AuthService {
  async signIn(data: ISingInRequest) {
    const response = await api.post<ISingInResponse>(
      '/auth/signin',
      data,
    );

    if (response.data.accessToken) this.setAccessToken(response.data.accessToken);

    return response.data;
  }

  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getNewTokens() {
    return api.post<string>('/auth/access-token');
  }

  clearStorage() {
    localStorage.clear();
  }

  async logout() {
    await api.get('/auth/logout');
    this.clearStorage();
  }
}

export const authService = new AuthService();
