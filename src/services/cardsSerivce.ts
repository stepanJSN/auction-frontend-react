import { apiWithAuth } from "../apiConfig";

export const cardsService = {
  getUserCards: async () => {
    const cards = await apiWithAuth.get('/cards/myCards');
    return cards.data;
  }
}
