import { apiWithAuth } from '../apiConfig';

export const transactionsService = {
  topUp: async (amount: number) => {
    const balance = await apiWithAuth.post('/transactions/topUp', { amount });
    return balance.data;
  },
  withdraw: async (amount: number) => {
    const balance = await apiWithAuth.post('/transactions/withdraw', {
      amount,
    });
    return balance.data;
  },
  getFeeAmount: async () => {
    const fee = await apiWithAuth.get<{ totalFeeAmount: number }>(
      '/transactions/fee',
    );
    return fee.data;
  },
};
