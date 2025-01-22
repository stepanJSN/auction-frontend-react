import { apiWithAuth } from '../apiConfig';

export const paymentService = {
  createPaymentIntent: async (data: { amount: number }) => {
    const response = await apiWithAuth.post<{ clientSecret: string }>(
      '/stripe/create-payment-intent',
      data,
    );
    return response.data;
  },

  createAccount: async () => {
    const response = await apiWithAuth.post<string>('/stripe/create-account');
    return response.data;
  },
};
