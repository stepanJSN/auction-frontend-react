import { useEffect } from 'react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { IDeleteMessageEventPayload } from '../../types/message.interfaces';

export default function useDeleteMessageListener(
  onDeleteMessage: (data: IDeleteMessageEventPayload) => void,
) {
  useEffect(() => {
    socket.on(ChatsEventEnum.DELETE_MESSAGE, onDeleteMessage);
    return () => {
      socket.off(ChatsEventEnum.DELETE_MESSAGE, onDeleteMessage);
    };
  }, [onDeleteMessage]);
}
