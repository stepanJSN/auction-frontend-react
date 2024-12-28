import axios, { AxiosError, type CreateAxiosDefaults } from 'axios';
import { authService } from './services/authService';
import { ROUTES } from './config/routesConfig';

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = axios.create(options);
const apiWithAuth = axios.create(options);

const redirectToSignIn = () => {
  window.location.href = ROUTES.SIGN_IN;
};

async function handleTokenRefresh(error: AxiosError) {
  const originalRequest: any = error.config!;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const token = (await authService.getNewTokens()).accessToken;
    if (token) {
      authService.setAccessToken(token);
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return apiWithAuth.request(originalRequest);
    }
  }

  throw error;
}

apiWithAuth.interceptors.request.use(async (config) => {
  const accessToken = authService.getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    try {
      return await handleTokenRefresh(error);
    } catch (tokenError) {
      redirectToSignIn();
    }

    return Promise.reject(error);
  },
);

export { api, apiWithAuth };
