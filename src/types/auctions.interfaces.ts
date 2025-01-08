import { SortOrderEnum } from '../enums/sortOrder.enum';
import { IPagination } from './pagination.interface';

export interface ICreateAuction {
  cardId: string;
  startingBid: number;
  minBidStep: number;
  maxBid?: number;
  minLength: number;
  endTime: Date;
}

export interface IAuctionSummary {
  id: string;
  starting_bid: number;
  min_bid_step: number;
  max_bid: number;
  end_time: string;
  created_at: string;
  created_by_id: string;
  is_completed: number;
  name: string;
  image_url: string;
  highest_bid: number | null;
  is_user_leader: boolean;
}

export interface IGetAuctionsResponse {
  data: IAuctionSummary[];
  info: IPagination;
}

export enum AuctionSortByEnum {
  CREATION_DATE = 'creationDate',
  FINISH_DATE = 'finishDate',
  HIGHEST_BID = 'highestBid',
}

export interface IGetAuctionsPayload {
  page?: number;
  locationId?: number;
  cardName?: string;
  fromPrice?: number;
  toPrice?: number;
  isUserTakePart?: boolean;
  isUserLeader?: boolean;
  sortOrder?: SortOrderEnum;
  sortBy?: AuctionSortByEnum;
}
