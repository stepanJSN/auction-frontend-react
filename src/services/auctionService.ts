import { apiWithAuth } from '../apiConfig';
import { ICreateAuction } from '../types/auctions.interfaces';

export const auctionService = {
  create: async (data: ICreateAuction) => {
    const auction = await apiWithAuth.post<ICreateAuction>('/auctions', data);
    return auction.data;
  },
};
