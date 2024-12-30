import { apiWithAuth } from '../apiConfig';
import { IGetSetsResponse } from '../types/sets.interface';

export const setsService = {
  getAll: async (page: number) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const sets = await apiWithAuth.get<IGetSetsResponse>('/sets', {
      params,
    });
    return sets.data;
  },
};
