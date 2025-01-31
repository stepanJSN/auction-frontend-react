import { apiWithAuth } from '../apiConfig';
import { ICreateSet, IGetSetsResponse, ISet } from '../types/sets.interface';

export const setsService = {
  getAll: async (page: number) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const sets = await apiWithAuth.get<IGetSetsResponse>('/sets', {
      params,
    });
    return sets.data;
  },

  getOne: async (id: string) => {
    const set = await apiWithAuth.get<Omit<ISet, 'is_user_has_set'>>(
      `/sets/${id}`,
    );
    return set.data;
  },

  create: async (data: ICreateSet) => {
    const set = await apiWithAuth.post<Omit<ISet, 'is_user_has_set'>>(
      '/sets',
      data,
    );
    return set.data;
  },

  update: async (id: string, data: Partial<ICreateSet>) => {
    const set = await apiWithAuth.patch<Omit<ISet, 'is_user_has_set'>>(
      `/sets/${id}`,
      data,
    );
    return set.data;
  },

  delete: async (id: string) => {
    await apiWithAuth.delete(`/sets/${id}`);
  },
};
