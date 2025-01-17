import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IAuctionEvent } from '../auctionEvents.interfaces';
import { AuctionEventEnum } from '../auctionEventEnum';
import { socket } from '../../../socket';
import { finishAuction, updateAuction, updateHighestBid } from './AuctionSlice';
import { getUser } from '../../user/userSlice';

export default function useAuctionUpdateListener(
  auctionId: string,
  isUserLeader?: boolean,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEvent = (event: IAuctionEvent) => {
      switch (event.type) {
        case AuctionEventEnum.NEW_BID:
          if (isUserLeader) {
            dispatch(getUser());
          }
          dispatch(updateHighestBid(event.payload.bidAmount!));
          break;
        case AuctionEventEnum.CHANGED:
          dispatch(updateAuction(event.payload));
          break;
        case AuctionEventEnum.FINISHED:
          if (isUserLeader) {
            dispatch(finishAuction());
          }
          break;
      }
    };
    socket.on(`auction-${auctionId}`, handleEvent);
    return () => {
      socket.off(`auction-${auctionId}`, handleEvent);
    };
  }, [auctionId, dispatch, isUserLeader]);
}
