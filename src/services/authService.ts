import { api } from '../apiConfig';
import { ISingInRequest, ISingInResponse } from './authService.interfaces';
class AuthService {
  async signIn(data: ISingInRequest) {
    const response = await api.post<ISingInResponse>(
      '/auth/signin',
      data,
    );

    if (response.data.accessToken) this.setAccessToken(response.data.accessToken);
    if (response.data.id) this.setUserId(response.data.id);

    return response;
  }

  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getUserId() {
    return localStorage.getItem('userId');
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
