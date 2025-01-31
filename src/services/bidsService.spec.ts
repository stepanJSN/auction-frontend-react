import { apiWithAuth } from '../apiConfig';
import { bidsService } from './bidsService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
  },
}));

describe('bidsService', () => {
  it('should create a bid', async () => {
    const mockData = {
      auctionId: 'auction1',
      bidAmount: 100,
    };
    const mockResponseData = mockData.bidAmount;
    jest
      .spyOn(apiWithAuth, 'post')
      .mockResolvedValue({ data: mockResponseData });

    await bidsService.create(mockData);
    expect(apiWithAuth.post).toHaveBeenCalledWith('/bids', mockData);
  });
});
