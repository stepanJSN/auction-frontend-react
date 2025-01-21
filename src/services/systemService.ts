import { apiWithAuth } from '../apiConfig';
import { IExchangeRate, IUpdateExchangeRate } from '../types/system.interfaces';

export const systemService = {
  getExchangeRate: async () => {
    const response = await apiWithAuth.get<IExchangeRate>(
      '/system/exchange-rate',
    );
    return response.data;
  },

  updateExchangeRate: async (data: IUpdateExchangeRate) => {
    const response = await apiWithAuth.patch<IExchangeRate>(
      '/system/exchange-rate',
      data,
    );
    return response.data;
  },
};
