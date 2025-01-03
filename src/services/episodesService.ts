import { apiWithAuth } from '../apiConfig';
import { IGetEpisodesResponse } from '../types/episodes.interfaces';

export const episodesService = {
  getAll: async ({ page = 1, name }: { page?: number; name?: string }) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (name) params.append('name', name);
    const episodes = await apiWithAuth.get<IGetEpisodesResponse>('/episodes', {
      params,
    });
    return episodes.data;
  },
};
