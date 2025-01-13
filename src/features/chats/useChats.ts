import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  IMessageEventPayload,
  IDeleteMessageEventPayload,
} from '../../types/message.interfaces';
import {
  deleteChat,
  setLastMessage,
  updateLastMessage,
  deleteLastMessage,
  setNameFilter,
  getMoreChats,
  getChats,
} from './chatsSlice';
import useDeleteChatListener from './useDeleteChatListener';
import useDeleteMessageListener from './useDeleteMessageListener';
import useNewMessageListener from './useNewMessageListener';
import useUpdateMessageListener from './useUpdateMessageListener';

export default function useChats() {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteChat(id));
    },
    [dispatch],
  );
  useDeleteChatListener(handleDelete);

  const handleNewMessage = useCallback(
    (message: IMessageEventPayload) => {
      dispatch(setLastMessage(message));
    },
    [dispatch],
  );
  useNewMessageListener(handleNewMessage);

  const handleEditMessage = useCallback(
    (message: IMessageEventPayload) => {
      dispatch(updateLastMessage(message));
    },
    [dispatch],
  );
  useUpdateMessageListener(handleEditMessage);

  const handleDeleteMessage = useCallback(
    (message: IDeleteMessageEventPayload) => {
      dispatch(deleteLastMessage(message));
    },
    [dispatch],
  );
  useDeleteMessageListener(handleDeleteMessage);

  const handleNameFilterChange = useCallback(
    (name: string) => {
      dispatch(setNameFilter(name));
    },
    [dispatch],
  );

  const handleLoadMore = useCallback(() => {
    dispatch(getMoreChats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  return { handleLoadMore, handleNameFilterChange };
}
