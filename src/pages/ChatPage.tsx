import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  addMessage,
  createMessage,
  deleteMessage,
  getChat,
  getMoreMessages,
  resendMessage,
  selectChat,
  setDeleteMessageSuccess,
} from '../features/chats/chat/chatSlice';
import { Divider, Grid2 } from '@mui/material';
import ChatHeader from '../features/chats/chat/ChatHeader';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import ChatField from '../features/chats/chat/ChatField';
import { useCallback, useEffect, useState } from 'react';
import ChatSettings from '../features/chats/chat/ChatSettings';
import MessageForm from '../features/chats/chat/MessageForm';
import useNewMessageListener from '../features/chats/useNewMessageListener';
import {
  IDeleteMessageEventPayload,
  IMessageEventPayload,
} from '../types/message.interfaces';
import { selectAuth } from '../features/auth/authSlice';
import useDeleteMessageListener from '../features/chats/useDeleteMessageListener';
import useDeleteChatListener from '../features/chats/useDeleteChatListener';
import ChatDeletedDialog from '../features/chats/chat/ChatDeletedDialog';
import useSidebarVisibility from '../hooks/useSidebarVisibility';

const settingsGridBreakpoints = {
  xs: 0,
  md: 4,
};

export default function ChatPage() {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const { name, participants, status, messages } = useSelector(selectChat);
  const { id } = useSelector(selectAuth);
  const [isScrollToBottomActive, setIsScrollToBottomActive] = useState(true);
  const [isChatDeletedDialogOpen, setIsChatDeletedDialogOpen] = useState(false);
  const {
    isSidebarOpen,
    isMobileVersion,
    handleSidebarOpen,
    handleSidebarClose,
    ref,
  } = useSidebarVisibility('md');

  useEffect(() => {
    if (!chatId) return;
    dispatch(getChat(chatId));
  }, [dispatch, chatId]);

  const handleSubmit = useCallback(
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

  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 size="grow">
          {status === QueryStatusEnum.SUCCESS && (
            <>
              <ChatHeader
                name={name!}
                isOpenSettingsButtonShown={isMobileVersion}
                numberOfParticipants={participants!.length}
                onSettingsButtonClick={handleSidebarOpen}
              />
              <ChatField
                messages={messages!.data}
                isScrollToBottomActive={isScrollToBottomActive}
                onDeleteMessage={handleMessageDelete}
                onResendMessage={handleMessageResend}
                onLoadMoreMessages={handleLoadMore}
              />
              <MessageForm onSubmit={handleSubmit} />
            </>
          )}
        </Grid2>
        {!isMobileVersion && <Divider orientation="vertical" flexItem />}
        <Grid2 size={settingsGridBreakpoints}>
          {status === QueryStatusEnum.SUCCESS && (
            <ChatSettings
              ref={ref}
              isOpen={isSidebarOpen}
              participants={participants!}
              chatId={chatId!}
              onClose={handleSidebarClose}
              isMobileVersion={isMobileVersion}
            />
          )}
        </Grid2>
      </Grid2>
      <ChatDeletedDialog open={isChatDeletedDialogOpen} />
    </>
  );
}
