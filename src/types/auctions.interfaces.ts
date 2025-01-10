import { SortOrderEnum } from '../enums/sortOrder.enum';
import { ICard } from './cards.interface';
import { IPagination } from './pagination.interface';

export interface ICreateAuction {
  cardId: string;
  startingBid: number;
  minBidStep: number;
  maxBid?: number;
  minLength: number;
  endTime: string;
}

export interface IUpdateAuction extends Omit<ICreateAuction, 'cardId'> {}

export interface IAuction {
  starting_bid: number;
  min_bid_step: number;
  max_bid: number | null;
  min_length: number;
  end_time: string;
  is_completed: boolean;
  is_this_user_auction: boolean;
  card: ICard;
  highest_bid: {
    amount: number;
    is_this_user_bid: boolean;
  } | null;
}

export interface IAuctionSummary {
  id: string;
  starting_bid: number;
  min_bid_step: number;
  max_bid: number | null;
  end_time: string;
  created_at: string;
  is_this_user_auction: boolean;
  is_completed: boolean;
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

export interface IPriceRange {
  min: number;
  max: number;
}
