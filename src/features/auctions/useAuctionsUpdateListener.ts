import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { AuctionEventEnum } from './auctionEventEnum';
import { IAuctionEvent } from './auctionEvents.interfaces';
import {
  updateAuctionHighestBid,
  updateAuctionGeneralInfo,
  removeAuctionFromList,
} from './AuctionsSlice';
import { IAuctionSummary } from '../../types/auctions.interfaces';

export default function useAuctionsUpdateListener(auctions: IAuctionSummary[]) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEvent = (event: IAuctionEvent) => {
      switch (event.type) {
        case AuctionEventEnum.NEW_BID:
          dispatch(updateAuctionHighestBid(event.payload));
          break;
        case AuctionEventEnum.CHANGED:
          dispatch(updateAuctionGeneralInfo(event.payload));
          break;
        case AuctionEventEnum.FINISHED:
          dispatch(removeAuctionFromList(event.payload.id));
          break;
      }
    };
    if (auctions.length > 0) {
      auctions.forEach((auction) => {
        socket.on(`auction-${auction.id}`, handleEvent);
      });
    }
    return () => {
      if (auctions.length > 0) {
        auctions.forEach((auction) => {
          socket.off(`auction-${auction.id}`, handleEvent);
        });
      }
    };
  }, [auctions, dispatch]);
}
