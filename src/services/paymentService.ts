import { apiWithAuth } from '../apiConfig';

export const paymentService = {
  createPaymentIntent: async () => {
    const response = await apiWithAuth.post<{ clientSecret: string }>(
      '/stripe/create-payment-intent',
    );
    return response.data;
  },
};
