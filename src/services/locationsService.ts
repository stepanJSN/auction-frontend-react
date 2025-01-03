import { apiWithAuth } from '../apiConfig';
import {
  IGetLocationsResponse,
  ILocation,
} from '../types/locations.interfaces';

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

  create: async (data: ILocation) => {
    const location = await apiWithAuth.post<ILocation>('/locations', data);
    return location.data;
  },

  update: async (id: number, data: ILocation) => {
    const location = await apiWithAuth.patch<ILocation>(
      `/locations/${id}`,
      data,
    );
    return location.data;
  },

  delete: async (id: number) => {
    await apiWithAuth.delete(`/locations/${id}`);
  },
};
