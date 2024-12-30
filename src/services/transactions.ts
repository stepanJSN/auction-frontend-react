import { apiWithAuth } from '../apiConfig';

export const transactionsService = {
  toUp: async (amount: number) => {
    await apiWithAuth.post('/transactions/toUp', { amount });
  },
  withdraw: async (amount: number) => {
    await apiWithAuth.post('/transactions/withdraw', { amount });
  },
};
