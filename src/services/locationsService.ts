import { apiWithAuth } from '../apiConfig';
import { IGetLocationsResponse } from '../types/locations.interfaces';

export const locationsService = {
  getAll: async ({ page = 1, name }: { page?: number; name?: string }) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (name) params.append('name', name);
    const locations = await apiWithAuth.get<IGetLocationsResponse>(
      '/locations',
      {
        params,
      },
    );
    return locations.data;
  },
};
