import { useEffect } from 'react';
import { socket } from '../../socket';

export default function useWebsocket() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
}
