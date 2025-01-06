import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export const episodeErrorMessages: Record<number, string> = {
  [ErrorCodesEnum.Conflict]: 'Episode with this name already exists',
};
