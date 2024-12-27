import { Gender } from '../enums/gender.enum';
import { IPagination } from './pagination.interface';

export interface ICardSummary {
  id: string;
  name: string;
  created_at: Date;
  image_url: string;
  type: string;
  gender: Gender;
  is_active: boolean;
  is_created_by_admin: boolean;
  location_id: number | null;
}

export interface IGetCardsResponse {
  data: ICardSummary[];
  info: IPagination;
}
