import { useCallback, useState } from 'react';
import { IMessageEventPayload } from '../../types/message.interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function useMessageNotification() {
  const userId = useSelector(
    useCallback((state: RootState) => state.auth.id, []),
  );
  const [notification, setNotification] = useState<{
    sender: string;
    chatId: string;
  } | null>(null);

  const handleNotificationClose = useCallback(() => {
    setNotification(null);
  }, []);

  const handleNewMessage = useCallback(
    (messageData: IMessageEventPayload) => {
      if (messageData.sender.id === userId) return;
      setNotification({
        sender: `${messageData.sender.name} ${messageData.sender.surname}`,
        chatId: messageData.chat_id,
      });
    },
    [userId],
  );

  return { notification, handleNotificationClose, handleNewMessage };
}
