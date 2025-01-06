import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const locationErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.Conflict]: 'Location with this name already exists',
};
