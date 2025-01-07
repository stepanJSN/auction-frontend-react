import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const createAuctionErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.BadRequest]: 'Card is not active or you don`t have this card',
};
