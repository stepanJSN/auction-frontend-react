import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const createLocationErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.Conflict]: 'Location with this name already exists',
};
