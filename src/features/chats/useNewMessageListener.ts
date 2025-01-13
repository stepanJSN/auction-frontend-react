import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { IMessageEventPayload } from '../../types/message.interfaces';

export default function useNewMessageListener(
  onNewMessage: (id: IMessageEventPayload) => void,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(ChatsEventEnum.NEW_MESSAGE, onNewMessage);
    return () => {
      socket.off(ChatsEventEnum.NEW_MESSAGE, onNewMessage);
    };
  }, [dispatch, onNewMessage]);
}
