import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const signupErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.Conflict]: 'User with this email already exists',
};
