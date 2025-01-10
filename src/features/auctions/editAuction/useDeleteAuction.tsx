import { useCallback } from 'react';
import useMutation from '../../../hooks/useMutation';
import { auctionService } from '../../../services/auctionService';

export default function useDeleteAuction(auctionId?: string) {
  const {
    mutate,
    status: deleteStatus,
    errorCode,
  } = useMutation((auctionId: string) => {
    return auctionService.delete(auctionId);
  });

  const handleDelete = useCallback(() => {
    if (!auctionId) return;
    mutate(auctionId);
  }, [auctionId, mutate]);

  return { handleDelete, deleteStatus, errorCode };
}
