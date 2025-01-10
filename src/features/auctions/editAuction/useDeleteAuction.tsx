import { useCallback } from 'react';
import useMutation from '../../../hooks/useMutation';
import { auctionService } from '../../../services/auctionService';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routesConfig';

export default function useDeleteAuction(auctionId?: string) {
  const {
    mutate,
    status: deleteStatus,
    errorCode,
  } = useMutation((auctionId: string) => {
    return auctionService.delete(auctionId);
  });
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    if (!auctionId) return;
    mutate(auctionId);
    navigate(ROUTES.AUCTIONS);
  }, [auctionId, mutate, navigate]);

  return { handleDelete, deleteStatus, errorCode };
}
