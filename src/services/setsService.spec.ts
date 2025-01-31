import { apiWithAuth } from '../apiConfig';
import { setsService } from './setsService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('setsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockSet = {
    id: 'setId',
    name: 'setName',
    bonus: 10,
    created_at: '2023-01-01T00:00:00.000Z',
    cards: [
      {
        id: 'cardId',
        name: 'cardName',
        is_active: true,
      },
    ],
  };

  it('should get all sets', async () => {
    const mockPage = 1;
    const mockResponseData = {
      data: [{ ...mockSet, is_user_has_set: true }],
      info: { page: mockPage, totalCount: 1, totalPages: 0 },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await setsService.getAll(mockPage);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPage.toString(),
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith('/sets', expect.any(Object));
    expect(result).toEqual(mockResponseData);
  });

  it('should get one set by id', async () => {
    const mockId = mockSet.id;
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue({ data: mockSet });

    const result = await setsService.getOne(mockId);
    expect(apiWithAuth.get).toHaveBeenCalledWith(`/sets/${mockId}`);
    expect(result).toEqual(mockSet);
  });

  it('should create a set', async () => {
    const mockPayload = {
      name: 'new location',
      bonus: 11,
      cardsId: ['card1'],
    };
    const mockResponse = {
      ...mockSet,
      name: mockPayload.name,
      bonus: mockPayload.bonus,
    };
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockResponse });

    const result = await setsService.create(mockPayload);
    expect(apiWithAuth.post).toHaveBeenCalledWith('/sets', mockPayload);
    expect(result).toEqual(mockResponse);
  });

  it('should update a set', async () => {
    const mockId = mockSet.id;
    const mockPayload = {
      name: 'Updated name',
    };
    const mockResponseData = {
      ...mockSet,
      name: mockPayload.name,
    };
    jest
      .spyOn(apiWithAuth, 'patch')
      .mockResolvedValue({ data: mockResponseData });

    const result = await setsService.update(mockId, mockPayload);
    expect(apiWithAuth.patch).toHaveBeenCalledWith(
      `/sets/${mockId}`,
      mockPayload,
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should delete an location', async () => {
    const mockId = mockSet.id;
    await setsService.delete(mockId);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(`/sets/${mockId}`);
  });
});
