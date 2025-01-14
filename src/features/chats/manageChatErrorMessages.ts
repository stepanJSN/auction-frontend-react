import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const manageChatErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.Conflict]: 'Chat already exists',
  [ErrorCodesEnum.BadRequest]:
    'Chat with more than 2 participants should have name',
};
