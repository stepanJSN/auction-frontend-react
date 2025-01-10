import { ErrorCodesEnum } from '../../../enums/errorCodes.enum';

export const editAuctionErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.Forbidden]: 'Auction has already ended',
};
