import { apiWithAuth } from '../apiConfig';
import { paymentService } from './paymentService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
  },
}));

describe('paymentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a payment intent', async () => {
    const mockPayload = {
      amount: 100,
    };
    const mockResponse = {
      clientSecret: 'mockClientSecret',
    };
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockResponse });

    const result = await paymentService.createPaymentIntent(mockPayload);
    expect(apiWithAuth.post).toHaveBeenCalledWith(
      '/stripe/create-payment-intent',
      mockPayload,
    );
    expect(result).toEqual(mockResponse);
  });

  it('should create a Stripe account', async () => {
    const mockResponse = 'mockAccountRegisterLink';
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockResponse });

    const result = await paymentService.createAccount();
    expect(apiWithAuth.post).toHaveBeenCalledWith('/stripe/create-account');
    expect(result).toEqual(mockResponse);
  });
});
