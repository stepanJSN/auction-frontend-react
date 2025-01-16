import { apiWithAuth } from '../apiConfig';
import {
  ICardsStatisticsResponse,
  IGeneralStatistics,
  ISetsStatisticsResponse,
  IUsersStatistics,
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
    const response = await apiWithAuth.get<IUsersStatistics[]>(
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
    const response = await apiWithAuth.get<ICardsStatisticsResponse>(
      '/statistics/cards',
      {
        params,
      },
    );
    return response.data;
  },

  findSetsStatistics: async (page?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    const response = await apiWithAuth.get<ISetsStatisticsResponse>(
      '/statistics/sets',
      {
        params,
      },
    );
    return response.data;
  },
};
