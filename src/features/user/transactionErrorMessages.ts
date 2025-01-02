import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const transactionErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.BadRequest]: 'Not enough balance',
};
