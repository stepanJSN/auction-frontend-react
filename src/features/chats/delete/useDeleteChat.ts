import { useCallback, useEffect } from 'react';
import useMutation from '../../../hooks/useMutation';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routesConfig';
import { chatsService } from '../../../services/chatsService';
import { MutationStatusEnum } from '../../../enums/mutationStatus';

export default function useDeleteChat(chatId?: string) {
  const {
    mutate,
    status: deleteStatus,
    errorCode,
  } = useMutation((chatId: string) => {
    return chatsService.delete(chatId);
  });
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    if (!chatId) return;
    mutate(chatId);
  }, [chatId, mutate]);

  useEffect(() => {
    if (deleteStatus === MutationStatusEnum.SUCCESS) {
      navigate(ROUTES.CHATS);
    }
  }, [deleteStatus, navigate]);

  return { handleDelete, deleteStatus, errorCode };
}
