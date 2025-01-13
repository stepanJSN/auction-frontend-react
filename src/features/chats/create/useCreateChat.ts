import { useCallback } from 'react';
import useMutation from '../../../hooks/useMutation';
import { chatsService } from '../../../services/chatsService';
import { ICreateChat } from '../../../types/chats.interfaces';

export default function useCreateChat() {
  const {
    mutate,
    status: creationStatus,
    errorCode,
  } = useMutation((data: ICreateChat) => {
    return chatsService.create(data);
  }, false);

  const handleCreate = useCallback(
    (data: ICreateChat) => {
      mutate(data);
    },
    [mutate],
  );

  return { handleCreate, creationStatus, errorCode };
}
