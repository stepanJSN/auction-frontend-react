import { apiWithAuth } from '../apiConfig';
import { Gender } from '../enums/gender.enum';
import { cardsService } from './cardsService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('cardsService', () => {
  const mockCard = { id: 'cardId', name: 'Card 1', is_active: true };
  it('should get all cards', async () => {
    const mockPayload = {
      page: 1,
      onlyUserCards: false,
      name: 'test',
    };
    const mockResponseData = {
      data: [mockCard],
      info: { page: 1, totalCount: 0, totalPages: 0 },
    };

    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    await cardsService.getAll(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPayload.page.toString(),
      name: mockPayload.name,
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith('/cards', expect.any(Object));
  });

  it('should get all user cards', async () => {
    const mockPayload = {
      page: 1,
      onlyUserCards: true,
      name: 'test',
    };
    const mockResponseData = {
      data: [mockCard],
      info: { page: 1, totalCount: 0, totalPages: 0 },
    };

    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    await cardsService.getAll(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPayload.page.toString(),
      name: mockPayload.name,
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith(
      '/cards/myCards',
      expect.any(Object),
    );
  });

  it('should get one card by id', async () => {
    const cardId = mockCard.id;
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue({ data: mockCard });

    const card = await cardsService.getOne(cardId);
    expect(apiWithAuth.get).toHaveBeenCalledWith(`/cards/${cardId}`);
    expect(card).toEqual(mockCard);
  });

  it('should create a card', async () => {
    const mockCreateCardData = {
      name: mockCard.name,
      type: 'cardType',
      gender: Gender.MALE,
      isActive: true,
      locationId: 1,
      episodesId: [1, 2],
    };
    const mockImage = new Blob();
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockCard });
    const result = await cardsService.create(mockCreateCardData, mockImage);

    const [[, formData]] = (apiWithAuth.post as jest.Mock).mock.calls;
    const receivedData = Object.fromEntries(formData);

    expect(receivedData).toEqual({
      name: mockCreateCardData.name,
      type: mockCreateCardData.type,
      gender: mockCreateCardData.gender,
      isActive: mockCreateCardData.isActive.toString(),
      locationId: mockCreateCardData.locationId.toString(),
      episodesId: JSON.stringify(mockCreateCardData.episodesId),
      image: expect.any(Blob),
    });
    expect(apiWithAuth.post).toHaveBeenCalledWith(
      '/cards',
      expect.any(Object),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    expect(result).toEqual(mockCard);
  });

  it('should update a card by id', async () => {
    const mockId = mockCard.id;
    const mockUpdateCardData = {
      name: 'Updated Card Name',
      type: 'cardType',
      gender: Gender.GENDERLESS,
      isActive: false,
      locationId: 7,
      episodesId: [3, 6],
    };
    const mockUpdatedCard = {
      ...mockCard,
      name: mockUpdateCardData.name,
      type: mockUpdateCardData.type,
      gender: mockUpdateCardData.gender,
    };
    const mockImage = new Blob();
    jest
      .spyOn(apiWithAuth, 'patch')
      .mockResolvedValue({ data: mockUpdatedCard });
    const result = await cardsService.update(
      mockId,
      mockUpdateCardData,
      mockImage,
    );

    const [[, formData]] = (apiWithAuth.patch as jest.Mock).mock.calls;
    const receivedData = Object.fromEntries(formData);

    expect(receivedData).toEqual({
      name: mockUpdateCardData.name,
      type: mockUpdateCardData.type,
      gender: mockUpdateCardData.gender,
      isActive: mockUpdateCardData.isActive.toString(),
      locationId: mockUpdateCardData.locationId.toString(),
      episodesId: JSON.stringify(mockUpdateCardData.episodesId),
      image: expect.any(Blob),
    });
    expect(apiWithAuth.patch).toHaveBeenCalledWith(
      `/cards/${mockId}`,
      expect.any(Object),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    expect(result).toEqual(mockUpdatedCard);
  });

  it('should delete a card by id', async () => {
    const mockId = mockCard.id;
    await cardsService.delete(mockId);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(`/cards/${mockId}`);
  });
});
