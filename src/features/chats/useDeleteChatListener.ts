import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';

export default function useDeleteChatListener(onDelete: (id: string) => void) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(ChatsEventEnum.DELETE, onDelete);
    return () => {
      socket.off(ChatsEventEnum.DELETE, onDelete);
    };
  }, [dispatch, onDelete]);
}
