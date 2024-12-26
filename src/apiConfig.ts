import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  type CreateAxiosDefaults,
} from 'axios';
import { authService } from './services/authService';

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = axios.create(options);
const apiWithAuth = axios.create(options);

apiWithAuth.interceptors.request.use(async (config) => {
  const accessToken = authService.getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiWithAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = (await authService.getNewTokens()).data.accessToken;
        if (token) {
          authService.setAccessToken(token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiWithAuth.request(originalRequest);
        }
      } catch (error) {
        window.location.href = '/signin';
      }
    }

    if (error.response?.status === 401) {
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  },
);

export { api, apiWithAuth };
