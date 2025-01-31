import { apiWithAuth } from '../apiConfig';
import {
  ICreateEpisode,
  IEpisode,
  IGetEpisodesResponse,
} from '../types/episodes.interfaces';

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

  create: async (data: ICreateEpisode) => {
    const episode = await apiWithAuth.post<IEpisode>('/episodes', data);
    return episode.data;
  },

  update: async (id: number, data: Partial<Omit<IEpisode, 'id'>>) => {
    const episode = await apiWithAuth.patch<IEpisode>(`/episodes/${id}`, data);
    return episode.data;
  },

  delete: async (id: number) => {
    await apiWithAuth.delete(`/episodes/${id}`);
  },
};
