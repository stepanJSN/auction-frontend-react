import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

export enum TransactionBedRequestCodesEnum {
  INSUFFICIENT_BALANCE,
  STRIPE_ACCOUNT_NOT_COMPLETED,
}

export const transactionErrorMessages: Record<number, string> = {
  [TransactionBedRequestCodesEnum.INSUFFICIENT_BALANCE]: 'Not enough balance',
  [TransactionBedRequestCodesEnum.STRIPE_ACCOUNT_NOT_COMPLETED]:
    'You don`t complete stripe account registration',
  [ErrorCodesEnum.NotFound]: 'Stripe account not found',
};
