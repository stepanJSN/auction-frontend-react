import { apiWithAuth } from '../apiConfig';
import { transactionsService } from './transactionsService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('transactionsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should top up user balance', async () => {
    const mockAmount = 10;
    const mockResponseData = {
      total: 1000,
      available: 950,
    };
    jest
      .spyOn(apiWithAuth, 'post')
      .mockResolvedValue({ data: mockResponseData });

    const result = await transactionsService.topUp(mockAmount);

    expect(apiWithAuth.post).toHaveBeenCalledWith('/transactions/topUp', {
      amount: mockAmount,
    });
    expect(result).toEqual(mockResponseData);
  });

  it('should withdraw money from user balance', async () => {
    const mockAmount = 10;
    const mockResponseData = {
      total: 1000,
      available: 950,
    };
    jest
      .spyOn(apiWithAuth, 'post')
      .mockResolvedValue({ data: mockResponseData });

    const result = await transactionsService.withdraw(mockAmount);

    expect(apiWithAuth.post).toHaveBeenCalledWith('/transactions/withdraw', {
      amount: mockAmount,
    });
    expect(result).toEqual(mockResponseData);
  });

  it('should get total fee amount', async () => {
    const mockResponseData = {
      totalFeeAmount: 1000,
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await transactionsService.getFeeAmount();

    expect(apiWithAuth.get).toHaveBeenCalledWith('/transactions/fee');
    expect(result).toEqual(mockResponseData);
  });
});
