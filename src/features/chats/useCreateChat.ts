import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { ICreateChatEventPayload } from '../../types/chats.interfaces';

export default function useCreateChatListener(
  onCreate: (data: ICreateChatEventPayload) => void,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(ChatsEventEnum.CREATE, onCreate);
    return () => {
      socket.off(ChatsEventEnum.CREATE, onCreate);
    };
  }, [dispatch, onCreate]);
}
