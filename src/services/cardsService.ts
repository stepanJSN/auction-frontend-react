import { apiWithAuth } from '../apiConfig';
import { ICard, IGetCardsResponse } from '../types/cards.interface';

export const cardsService = {
  getUserCards: async (page: number) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const cards = await apiWithAuth.get<IGetCardsResponse>('/cards/myCards', {
      params,
    });
    return cards.data;
  },

  getOne: async (id: string) => {
    const card = await apiWithAuth.get<ICard>(`/cards/${id}`);
    return card.data;
  },
};
