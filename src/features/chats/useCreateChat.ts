import { useEffect } from 'react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { ICreateChatEventPayload } from '../../types/chats.interfaces';

export default function useCreateChatListener(
  onCreate: (data: ICreateChatEventPayload) => void,
) {
  useEffect(() => {
    socket.on(ChatsEventEnum.CREATE, onCreate);
    return () => {
      socket.off(ChatsEventEnum.CREATE, onCreate);
    };
  }, [onCreate]);
}
