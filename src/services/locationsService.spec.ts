import { apiWithAuth } from '../apiConfig';
import { locationsService } from './locationsService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('locationsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all locations', async () => {
    const mockPayload = {
      page: 1,
      name: 'test',
    };
    const mockResponseData = {
      data: [
        {
          id: 1,
          name: mockPayload.name,
          type: 'mockType',
        },
      ],
      info: { page: mockPayload.page, totalCount: 1, totalPages: 0 },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await locationsService.getAll(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPayload.page.toString(),
      name: mockPayload.name,
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/locations',
      expect.any(Object),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should create an location', async () => {
    const mockPayload = {
      name: 'new location',
      type: 'mockType',
    };
    const mockResponse = {
      id: 1,
      name: mockPayload.name,
      type: mockPayload.type,
    };
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockResponse });

    const result = await locationsService.create(mockPayload);
    expect(apiWithAuth.post).toHaveBeenCalledWith('/locations', mockPayload);
    expect(result).toEqual(mockResponse);
  });

  it('should update an location', async () => {
    const mockId = 1;
    const mockPayload = {
      name: 'Updated name',
    };
    const mockResponseData = {
      id: mockId,
      name: mockPayload.name,
      type: 'mockType',
    };
    jest
      .spyOn(apiWithAuth, 'patch')
      .mockResolvedValue({ data: mockResponseData });

    const result = await locationsService.update(mockId, mockPayload);
    expect(apiWithAuth.patch).toHaveBeenCalledWith(
      `/locations/${mockId}`,
      mockPayload,
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should delete an location', async () => {
    const mockId = 1;
    await locationsService.delete(mockId);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(`/locations/${mockId}`);
  });
});
