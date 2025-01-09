import { AuctionEventEnum } from './auctionEventEnum';

export interface IAuctionEvent {
  type: AuctionEventEnum;
  payload: {
    id: string;
    startingBid?: number;
    minBidStep?: number;
    maxBid?: number;
    minLength?: number;
    endTime?: string;
    bidAmount?: number;
  };
}
