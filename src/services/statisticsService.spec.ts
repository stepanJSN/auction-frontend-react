import { apiWithAuth } from '../apiConfig';
import { statisticsService } from './statisticsService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    get: jest.fn(),
  },
}));

describe('statisticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get general statistics', async () => {
    const mockResponseData = {
      mostRepeatedCard: {
        id: 'cardId',
        name: 'cardName',
        numberOfInstances: 20,
      },
      leastRepeatedCard: {
        id: 'cardId',
        name: 'anotherCard',
        numberOfInstances: 1,
      },
      numberOfCardsCreatedByAdmin: 50,
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await statisticsService.findGeneralStatistics();
    expect(apiWithAuth.get).toHaveBeenCalledWith('/statistics/general');
    expect(result).toEqual(mockResponseData);
  });

  it('should get user statistics', async () => {
    const mockNumberOfUsers = 10;
    const mockResponseData = [
      {
        id: 'userId',
        name: 'user1',
        surname: 'user1Surname',
        numberOfCards: 10,
      },
    ];
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result =
      await statisticsService.findUserStatistics(mockNumberOfUsers);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      numberOfUsers: mockNumberOfUsers.toString(),
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/statistics/users',
      expect.any(Object),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should get cards statistics', async () => {
    const mockPage = 1;
    const mockResponseData = {
      data: [
        {
          id: 'cardId',
          cardName: 'cardName',
          numberOfInstances: 5,
          averagePrice: 17.6,
        },
      ],
      info: { page: mockPage, totalCount: 1, totalPages: 0 },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await statisticsService.findCardsStatistics(mockPage);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPage.toString(),
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/statistics/cards',
      expect.any(Object),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should get sets statistics', async () => {
    const mockPage = 1;
    const mockResponseData = {
      data: [
        {
          id: 'setId',
          setName: 'setName',
          numberOfUsers: 5,
        },
      ],
      info: { page: mockPage, totalCount: 1, totalPages: 0 },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await statisticsService.findSetsStatistics(mockPage);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPage.toString(),
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/statistics/sets',
      expect.any(Object),
    );
    expect(result).toEqual(mockResponseData);
  });
});
