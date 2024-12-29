import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const signinErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.Unauthorized]: 'Incorrect email or password',
};
