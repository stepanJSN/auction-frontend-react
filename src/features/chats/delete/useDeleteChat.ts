import { useCallback } from 'react';
import useMutation from '../../../hooks/useMutation';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routesConfig';
import { chatsService } from '../../../services/chatsService';

export default function useDeleteChat(chatId?: string) {
  const {
    mutate,
    status: deleteStatus,
    errorCode,
  } = useMutation((auctionId: string) => {
    return chatsService.delete(auctionId);
  });
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    if (!chatId) return;
    mutate(chatId);
    navigate(ROUTES.CHATS);
  }, [chatId, mutate, navigate]);

  return { handleDelete, deleteStatus, errorCode };
}
