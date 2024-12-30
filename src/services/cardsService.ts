import { apiWithAuth } from '../apiConfig';
import { ICard, IGetCardsResponse } from '../types/cards.interface';

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
};
