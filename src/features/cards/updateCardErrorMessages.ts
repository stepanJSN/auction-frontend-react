import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const updateCardErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.NotFound]: 'Card not found',
};
