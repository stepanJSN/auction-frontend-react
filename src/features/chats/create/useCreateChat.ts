import { useCallback } from 'react';
import useMutation from '../../../hooks/useMutation';
import { chatsService } from '../../../services/chatsService';
import { ICreateChat } from '../../../types/chats.interfaces';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routesConfig';

export default function useCreateChat() {
  const navigate = useNavigate();
  const {
    mutate,
    status: creationStatus,
    errorCode,
  } = useMutation((data: ICreateChat) => {
    return chatsService.create(data);
  }, false);

  const handleCreate = useCallback(
    async (data: ICreateChat) => {
      const response = await mutate(data);
      if (response) navigate(ROUTES.CHAT(response.id));
    },
    [mutate, navigate],
  );

  return { handleCreate, creationStatus, errorCode };
}
