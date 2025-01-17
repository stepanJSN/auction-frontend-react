import { useEffect, useCallback, useState } from 'react';
import {
  IMessageEventPayload,
  IDeleteMessageEventPayload,
} from '../../../types/message.interfaces';
import useDeleteChatListener from '../useDeleteChatListener';
import useDeleteMessageListener from '../useDeleteMessageListener';
import useNewMessageListener from '../useNewMessageListener';
import {
  getChat,
  createMessage,
  getMoreMessages,
  deleteMessage,
  resendMessage,
  addMessage,
  setDeleteMessageSuccess,
  selectChat,
} from './chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../user/userSlice';

export default function useChat(chatId?: string) {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);
  const { messages } = useSelector(selectChat);
  const [isScrollToBottomActive, setIsScrollToBottomActive] = useState(true);
  const [isChatDeletedDialogOpen, setIsChatDeletedDialogOpen] = useState(false);
  useEffect(() => {
    if (!chatId) return;
    dispatch(getChat(chatId));
  }, [dispatch, chatId]);

  const handleCreateMessage = useCallback(
    (data: { message: string }) => {
      if (!chatId) return;
      dispatch(
        createMessage({
          tempId: new Date().getTime().toString(),
          chatId,
          message: data.message,
        }),
      );
      setIsScrollToBottomActive(true);
    },
    [chatId, dispatch],
  );

  const handleLoadMore = useCallback(() => {
    if (!chatId || !messages.hasNextPage) return;
    dispatch(getMoreMessages(chatId));
    setIsScrollToBottomActive(false);
  }, [chatId, dispatch, messages.hasNextPage]);

  const handleMessageDelete = useCallback(
    (messageId: string) => {
      if (!chatId) return;
      dispatch(
        deleteMessage({
          messageId,
          chatId,
        }),
      );
    },
    [chatId, dispatch],
  );

  const handleMessageResend = useCallback(
    (messageId: string) => {
      if (!chatId) return;
      dispatch(
        resendMessage({
          tempId: messageId,
          chatId,
        }),
      );
    },
    [chatId, dispatch],
  );

  const handleNewMessage = useCallback(
    (message: IMessageEventPayload) => {
      if (message.chat_id !== chatId || message.sender.id === id) return;
      dispatch(addMessage(message));
      setIsScrollToBottomActive(true);
    },
    [chatId, dispatch, id],
  );
  useNewMessageListener(handleNewMessage);

  const handleDeleteMessageEvent = useCallback(
    (data: IDeleteMessageEventPayload) => {
      dispatch(setDeleteMessageSuccess(data.id));
    },
    [dispatch],
  );
  useDeleteMessageListener(handleDeleteMessageEvent);

  const handleDeleteChatEvent = useCallback((_id: string) => {
    setIsChatDeletedDialogOpen(true);
  }, []);
  useDeleteChatListener(handleDeleteChatEvent);

  return {
    handleCreateMessage,
    handleLoadMore,
    handleMessageDelete,
    handleMessageResend,
    isScrollToBottomActive,
    isChatDeletedDialogOpen,
  };
}
