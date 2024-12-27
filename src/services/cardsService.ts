import { apiWithAuth } from '../apiConfig';

export const cardsService = {
  getUserCards: async (page: number) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const cards = await apiWithAuth.get('/cards/myCards', {
      params,
    });
    return cards.data;
  },
};
