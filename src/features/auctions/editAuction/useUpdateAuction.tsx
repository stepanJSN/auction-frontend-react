import { useCallback } from 'react';
import useMutation from '../../../hooks/useMutation';
import { IUpdateAuction } from '../../../types/auctions.interfaces';
import { auctionService } from '../../../services/auctionService';
import { Dayjs } from 'dayjs';

export default function useUpdateAuction(auctionId?: string) {
  const {
    mutate,
    status: updateStatus,
    errorCode,
  } = useMutation((data: IUpdateAuction) => {
    if (!auctionId) return;
    return auctionService.update(auctionId, data);
  });

  const handleUpdate = useCallback(
    (data: Omit<IUpdateAuction, 'endTime'> & { endTime: Dayjs }) => {
      mutate({
        minBidStep: +data.minBidStep,
        maxBid: data.maxBid ? +data.maxBid : undefined,
        startingBid: +data.startingBid,
        minLength: +data.minLength,
        endTime: data.endTime.toISOString(),
      });
    },
    [mutate],
  );

  return { handleUpdate, updateStatus, errorCode };
}
