import { useCallback, useState } from 'react';
import { IMessageEventPayload } from '../../types/message.interfaces';

export default function useMessageNotification() {
  const [notification, setNotification] = useState<{
    sender: string;
    chatId: string;
  } | null>(null);

  const handleNotificationClose = useCallback(() => {
    setNotification(null);
  }, []);

  const handleNewMessage = useCallback((messageData: IMessageEventPayload) => {
    setNotification({
      sender: `${messageData.sender.name} ${messageData.sender.surname}`,
      chatId: messageData.chat_id,
    });
  }, []);

  return { notification, handleNotificationClose, handleNewMessage };
}
