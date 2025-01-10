import { io } from 'socket.io-client';
import { authService } from './services/authService';

const URL = import.meta.env.VITE_SERVER_URL;
const accessToken = authService.getAccessToken();

export const socket = io(URL, {
  auth: {
    token: `Bearer ${accessToken}`,
  },
  transports: ['websocket'],
});
