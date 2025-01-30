import { auctionService } from '../services/auctionService';
import { apiWithAuth } from '../apiConfig';
import { AuctionTypeEnum } from '../types/auctions.interfaces';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('auctionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an auction', async () => {
    const mockData = {
      cardId: 'card1',
      startingBid: 100,
      minBidStep: 2,
      maxBid: 1000,
      minLength: 100,
      endTime: '2023-08-01T00:00:00.000Z',
    };
    await auctionService.create(mockData);
    expect(apiWithAuth.post).toHaveBeenCalledWith('/auctions', mockData);
  });

  it('should find all auctions with correct parameters and query /auctions endpoint if type is AVAILABLE', async () => {
    const mockPayload = {
      page: 1,
      cardName: 'Test Card',
      type: AuctionTypeEnum.AVAILABLE,
    };
    const mockResponse = {
      data: {
        data: [],
        info: { page: 1, totalCount: 0, totalPages: 0 },
      },
    };
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue(mockResponse);

    await auctionService.findAll(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPayload.page.toString(),
      cardName: mockPayload.cardName,
    });

    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/auctions',
      expect.any(Object),
    );
  });

  it('should find all auctions with correct parameters and query /auctions/createdByUser endpoint if type is CREATED_BY_USER', async () => {
    const mockPayload = {
      type: AuctionTypeEnum.CREATED_BY_USER,
    };
    const mockResponse = {
      data: {
        data: [],
        info: { page: 1, totalCount: 0, totalPages: 0 },
      },
    };
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue(mockResponse);

    await auctionService.findAll(mockPayload);

    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/auctions/createdByUser',
      expect.any(Object),
    );
  });

  it('should find all auctions with correct parameters and query /auctions/wonByUser endpoint if type is WON_BY_USER', async () => {
    const mockPayload = {
      type: AuctionTypeEnum.WON_BY_USER,
    };
    const mockResponse = {
      data: {
        data: [],
        info: { page: 1, totalCount: 0, totalPages: 0 },
      },
    };
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue(mockResponse);

    await auctionService.findAll(mockPayload);

    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/auctions/wonByUser',
      expect.any(Object),
    );
  });

  it('should find price range', async () => {
    const mockPriceRange = { min: 10, max: 100 };
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue({ data: mockPriceRange });
    const priceRange = await auctionService.findPriceRange();
    expect(priceRange).toEqual(mockPriceRange);
    expect(apiWithAuth.get).toHaveBeenCalledWith('/auctions/priceRange');
  });

  it('should find an auction by id', async () => {
    const auctionId = 'auction1Id';
    const mockAuction = {
      id: auctionId,
      starting_bid: 100,
      min_bid_step: 2,
    };
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue({ data: mockAuction });
    const auction = await auctionService.findOne(auctionId);
    expect(auction).toEqual(mockAuction);
    expect(apiWithAuth.get).toHaveBeenCalledWith(`/auctions/${auctionId}`);
  });

  it('should update an auction', async () => {
    const auctionId = 'auction1Id';
    const mockUpdateAuctionData = {
      startingBid: 200,
    };
    await auctionService.update(auctionId, mockUpdateAuctionData as any);
    expect(apiWithAuth.patch).toHaveBeenCalledWith(
      `/auctions/${auctionId}`,
      mockUpdateAuctionData,
    );
  });

  it('should delete an auction', async () => {
    const auctionId = 'auction1Id';
    await auctionService.delete(auctionId);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(`/auctions/${auctionId}`);
  });
});
