import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  createMessage,
  getChat,
  selectChat,
} from '../features/chats/chat/chatSlice';
import { Divider, Grid2 } from '@mui/material';
import ChatHeader from '../features/chats/chat/ChatHeader';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import ChatField from '../features/chats/chat/ChatField';
import { useCallback, useEffect } from 'react';
import ChatSettings from '../features/chats/chat/ChatSettings';
import MessageForm from '../features/chats/chat/MessageForm';

export default function ChatPage() {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const { name, participants, status, messages } = useSelector(selectChat);

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
    },
    [chatId, dispatch],
  );

  return (
    <Grid2 container spacing={1}>
      <Grid2 size="grow">
        {status === QueryStatusEnum.SUCCESS && (
          <>
            <ChatHeader
              name={name!}
              numberOfParticipants={participants!.length}
            />
            <ChatField messages={messages!.data} />
            <MessageForm onSubmit={handleSubmit} />
          </>
        )}
      </Grid2>
      <Divider orientation="vertical" flexItem />
      <Grid2 size={4}>
        {status === QueryStatusEnum.SUCCESS && (
          <ChatSettings participants={participants!} chatId={chatId!} />
        )}
      </Grid2>
    </Grid2>
  );
}
