import { useEffect } from 'react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { IMessageEventPayload } from '../../types/message.interfaces';

export default function useUpdateMessageListener(
  onUpdateMessage: (id: IMessageEventPayload) => void,
) {
  useEffect(() => {
    socket.on(ChatsEventEnum.UPDATE_MESSAGE, onUpdateMessage);
    return () => {
      socket.off(ChatsEventEnum.UPDATE_MESSAGE, onUpdateMessage);
    };
  }, [onUpdateMessage]);
}
