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
  async function (error: AxiosError) {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.config && !error.config.data._isRetry) {
      if (originalRequest?.data) {
        originalRequest.data._isRetry = true;
      }
      const token = (await authService.getNewTokens()).data;
      if (token) {
        authService.setAccessToken(token);
        return apiWithAuth.request(
          originalRequest as InternalAxiosRequestConfig<{ _isRetry: boolean }>,
        );
      }
    }
    if (error.response?.status === 401) {
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  },
);

export { api, apiWithAuth };
