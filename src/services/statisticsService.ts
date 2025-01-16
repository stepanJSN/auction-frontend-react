import { apiWithAuth } from '../apiConfig';
import {
  IGeneralStatistics,
  IUsersStatisticsResponse,
} from '../types/statistics.interfaces';

export const statisticsService = {
  findGeneralStatistics: async () => {
    const response = await apiWithAuth.get<IGeneralStatistics>(
      '/statistics/general',
    );
    return response.data;
  },

  findUserStatistics: async (numberOfUsers?: string) => {
    const params = new URLSearchParams();
    if (numberOfUsers) params.append('numberOfUsers', numberOfUsers);
    const response = await apiWithAuth.get<IUsersStatisticsResponse>(
      '/statistics/users',
      {
        params,
      },
    );
    return response.data;
  },

  findCardsStatistics: async (page?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    const response = await apiWithAuth.get('/statistics/cards', {
      params,
    });
    return response.data;
  },

  findSetsStatistics: async (page?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    const response = await apiWithAuth.get('/statistics/sets', {
      params,
    });
    return response.data;
  },
};
