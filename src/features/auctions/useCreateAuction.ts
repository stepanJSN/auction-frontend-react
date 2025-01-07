import { useCallback } from 'react';
import useMutation from '../../hooks/useMutation';
import { auctionService } from '../../services/auctionService';
import { ICreateAuction } from '../../types/auctions.interfaces';

export default function useCreateAuction(cardId?: string) {
  const {
    mutate,
    status: creationStatus,
    errorCode,
  } = useMutation((data: ICreateAuction) => {
    return auctionService.create(data);
  }, false);

  const handleCreate = useCallback(
    (data: Omit<ICreateAuction, 'cardId'>) => {
      mutate({
        minBidStep: +data.minBidStep,
        maxBid: data.maxBid ? +data.maxBid : undefined,
        startingBid: +data.startingBid,
        minLength: +data.minLength,
        endTime: data.endTime,
        cardId: cardId!,
      });
    },
    [mutate, cardId],
  );

  return { handleCreate, creationStatus, errorCode };
}
