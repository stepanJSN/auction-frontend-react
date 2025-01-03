import { IPagination } from './pagination.interface';

export interface ILocation {
  id: number;
  name: string;
  type: string;
}

export interface IGetLocationsResponse {
  data: ILocation[];
  info: IPagination;
}
