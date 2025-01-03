import { apiWithAuth } from '../apiConfig';
import {
  ICard,
  ICreateCard,
  IGetCardsResponse,
} from '../types/cards.interface';

export const cardsService = {
  getAll: async (page: number, onlyUserCards: boolean = false) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const url = onlyUserCards ? '/cards/myCards' : '/cards';
    const cards = await apiWithAuth.get<IGetCardsResponse>(url, {
      params,
    });
    return cards.data;
  },

  getOne: async (id: string) => {
    const card = await apiWithAuth.get<ICard>(`/cards/${id}`);
    return card.data;
  },

  create: async (data: ICreateCard, image: Blob) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.type) formData.append('type', data.type);
    formData.append('gender', data.gender);
    formData.append('isActive', data.isActive.toString());
    formData.append('locationId', data.locationId.toString());
    formData.append('episodesId', JSON.stringify(data.episodesId));
    formData.append('image', image);
    const card = await apiWithAuth.post<ICard>('/cards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return card.data;
  },

  update: async (id: string, data: ICreateCard, image?: Blob) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.type) formData.append('type', data.type);
    formData.append('gender', data.gender);
    formData.append('isActive', data.isActive.toString());
    formData.append('locationId', data.locationId.toString());
    formData.append('episodesId', JSON.stringify(data.episodesId));
    if (image) formData.append('image', image);
    const card = await apiWithAuth.patch<ICard>(`/cards/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return card.data;
  },
};
