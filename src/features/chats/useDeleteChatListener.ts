import { useEffect } from 'react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';

export default function useDeleteChatListener(onDelete: (id: string) => void) {
  useEffect(() => {
    socket.on(ChatsEventEnum.DELETE, onDelete);
    return () => {
      socket.off(ChatsEventEnum.DELETE, onDelete);
    };
  }, [onDelete]);
}
