export interface IAuctionNewBidEvent {
  auctionId: string;
  bidAmount: number;
}

export interface IAuctionChangedEvent {
  id: string;
  startingBid?: number;
  minBidStep?: number;
  maxBid?: number;
  minLength?: number;
  endTime?: Date;
}

export interface IAuctionFinishedEvent {
  auctionId: string;
}
