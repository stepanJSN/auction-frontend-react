import { apiWithAuth } from '../apiConfig';
import { ICreateBid } from '../types/bids.interfaces';

export const bidsService = {
  create: async (data: ICreateBid) => {
    const bid = await apiWithAuth.post('/bids', data);
    return bid.data;
  },
};
