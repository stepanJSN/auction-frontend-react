import { useEffect } from 'react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { IMessageEventPayload } from '../../types/message.interfaces';

export default function useNewMessageListener(
  onNewMessage: (id: IMessageEventPayload) => void,
) {
  useEffect(() => {
    socket.on(ChatsEventEnum.NEW_MESSAGE, onNewMessage);
    return () => {
      socket.off(ChatsEventEnum.NEW_MESSAGE, onNewMessage);
    };
  }, [onNewMessage]);
}
