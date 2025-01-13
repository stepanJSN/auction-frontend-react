import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import { IDeleteMessageEventPayload } from '../../types/message.interfaces';

export default function useDeleteMessageListener(
  onDeleteMessage: (id: IDeleteMessageEventPayload) => void,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(ChatsEventEnum.DELETE_MESSAGE, onDeleteMessage);
    return () => {
      socket.off(ChatsEventEnum.DELETE_MESSAGE, onDeleteMessage);
    };
  }, [dispatch, onDeleteMessage]);
}
