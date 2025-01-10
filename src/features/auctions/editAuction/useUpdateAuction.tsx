import { useCallback } from 'react';
import useMutation from '../../../hooks/useMutation';
import { IUpdateAuction } from '../../../types/auctions.interfaces';
import { auctionService } from '../../../services/auctionService';

export default function useUpdateAuction(cardId?: string) {
  const {
    mutate,
    status: creationStatus,
    errorCode,
  } = useMutation((data: IUpdateAuction) => {
    if (!cardId) return;
    return auctionService.update(cardId, data);
  });

  const handleCreate = useCallback(
    (data: IUpdateAuction) => {
      mutate({
        minBidStep: +data.minBidStep,
        maxBid: data.maxBid ? +data.maxBid : undefined,
        startingBid: +data.startingBid,
        minLength: +data.minLength,
        endTime: data.endTime,
      });
    },
    [mutate],
  );

  return { handleCreate, creationStatus, errorCode };
}
