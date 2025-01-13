import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { IMessageEventPayload } from '../../types/message.interfaces';

export default function useUpdateMessageListener(
  onUpdateMessage: (id: IMessageEventPayload) => void,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(ChatsEventEnum.UPDATE_MESSAGE, onUpdateMessage);
    return () => {
      socket.off(ChatsEventEnum.UPDATE_MESSAGE, onUpdateMessage);
    };
  }, [dispatch, onUpdateMessage]);
}
