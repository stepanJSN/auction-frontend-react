import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const createCardErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.BadRequest]: 'Not all cards from the API were sold',
};
