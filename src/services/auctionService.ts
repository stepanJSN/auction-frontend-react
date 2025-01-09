import { apiWithAuth } from '../apiConfig';
import {
  IAuction,
  ICreateAuction,
  IGetAuctionsPayload,
  IGetAuctionsResponse,
  IPriceRange,
} from '../types/auctions.interfaces';

export const auctionService = {
  create: async (data: ICreateAuction) => {
    const auction = await apiWithAuth.post<ICreateAuction>('/auctions', data);
    return auction.data;
  },

  findAll: async (payload: IGetAuctionsPayload) => {
    const params = new URLSearchParams();
    if (payload.page) params.append('page', payload.page.toString());
    if (payload.locationId)
      params.append('locationId', payload.locationId.toString());
    if (payload.cardName) params.append('cardName', payload.cardName);
    if (payload.fromPrice)
      params.append('fromPrice', payload.fromPrice.toString());
    if (payload.toPrice) params.append('toPrice', payload.toPrice.toString());
    if (payload.isUserTakePart)
      params.append('isUserTakePart', payload.isUserTakePart.toString());
    if (payload.isUserLeader)
      params.append('isUserLeader', payload.isUserLeader.toString());
    if (payload.sortOrder) params.append('sortOrder', payload.sortOrder);
    if (payload.sortBy) params.append('sortBy', payload.sortBy);
    const auctions = await apiWithAuth.get<IGetAuctionsResponse[]>(
      '/auctions',
      {
        params,
      },
    );
    return auctions.data;
  },

  findPriceRange: async () => {
    const priceRange = await apiWithAuth.get<IPriceRange>(
      '/auctions/priceRange',
    );
    return priceRange.data;
  },

  findOne: async (id: string) => {
    const auction = await apiWithAuth.get<IAuction>(`/auctions/${id}`);
    return auction.data;
  },
};
