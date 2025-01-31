import { apiWithAuth } from '../apiConfig';
import { episodesService } from './episodesService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('episodesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all episodes', async () => {
    const mockPayload = {
      page: 1,
      name: 'test',
    };
    const mockResponseData = {
      data: [
        {
          id: 1,
          name: mockPayload.name,
          code: 'mockCode',
        },
      ],
      info: { page: mockPayload.page, totalCount: 1, totalPages: 0 },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await episodesService.getAll(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPayload.page.toString(),
      name: mockPayload.name,
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/episodes',
      expect.any(Object),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should create an episode', async () => {
    const mockPayload = {
      name: 'new episode',
      code: 'mockCode',
    };
    const mockResponse = {
      id: 1,
      name: mockPayload.name,
      code: mockPayload.code,
    };
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockResponse });

    const result = await episodesService.create(mockPayload);
    expect(apiWithAuth.post).toHaveBeenCalledWith('/episodes', mockPayload);
    expect(result).toEqual(mockResponse);
  });

  it('should update an episode', async () => {
    const mockId = 1;
    const mockPayload = {
      name: 'Updated name',
    };
    const mockResponseData = {
      id: mockId,
      name: mockPayload.name,
      code: 'mockCode',
    };
    jest
      .spyOn(apiWithAuth, 'patch')
      .mockResolvedValue({ data: mockResponseData });

    const result = await episodesService.update(mockId, mockPayload);
    expect(apiWithAuth.patch).toHaveBeenCalledWith(
      `/episodes/${mockId}`,
      mockPayload,
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should delete an episode', async () => {
    const mockId = 1;
    await episodesService.delete(mockId);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(`/episodes/${mockId}`);
  });
});
