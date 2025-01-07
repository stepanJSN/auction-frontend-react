export interface ICreateAuction {
  cardId: string;
  startingBid: number;
  minBidStep: number;
  maxBid?: number;
  minLength: number;
  endTime: Date;
}
