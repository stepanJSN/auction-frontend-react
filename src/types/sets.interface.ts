import { ICardSummary } from './cards.interface';
import { IPagination } from './pagination.interface';

export interface ISet {
  id: string;
  name: string;
  bonus: number;
  is_user_has_set: boolean;
  created_at: string;
  cards: ICardSummary[];
}

export interface IGetSetsResponse {
  data: ICardSummary[];
  info: IPagination;
}
