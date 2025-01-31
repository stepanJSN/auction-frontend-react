import { apiWithAuth } from '../apiConfig';
import { systemService } from './systemService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    get: jest.fn(),
    patch: jest.fn(),
  },
}));

describe('systemService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get exchange rate', async () => {
    const mockResponseData = {
      exchange_rate: 0.7,
      updated_at: '2025-01-01T00:00:00.000Z',
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await systemService.getExchangeRate();

    expect(apiWithAuth.get).toHaveBeenCalledWith('/system/exchange-rate');
    expect(result).toEqual(mockResponseData);
  });

  it('should update exchange rate', async () => {
    const mockPayload = {
      exchangeRate: 0.5,
    };
    const mockResponseData = {
      exchange_rate: 0.7,
      updated_at: new Date().toISOString(),
    };
    jest
      .spyOn(apiWithAuth, 'patch')
      .mockResolvedValue({ data: mockResponseData });

    const result = await systemService.updateExchangeRate(mockPayload);

    expect(apiWithAuth.patch).toHaveBeenCalledWith(
      '/system/exchange-rate',
      mockPayload,
    );
    expect(result).toEqual(mockResponseData);
  });
});
