export enum BidErrorCodeEnum {
  AUCTION_COMPLETED = 2,
  INSUFFICIENT_BALANCE = 3,
  BID_NOT_EXCEEDS_MINIMUM_STEP = 6,
}

export const createBidErrorMessages: Record<number, string> = {
  [BidErrorCodeEnum.AUCTION_COMPLETED]: 'Auction is completed',
  [BidErrorCodeEnum.INSUFFICIENT_BALANCE]: 'Not enough balance',
  [BidErrorCodeEnum.BID_NOT_EXCEEDS_MINIMUM_STEP]:
    'Bid not exceeds minimum step',
};
