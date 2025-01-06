import { IPagination } from './pagination.interface';

export interface IEpisode {
  id: number;
  name: string;
  code: string;
}

export interface IGetEpisodesResponse {
  data: IEpisode[];
  info: IPagination;
}

export interface ICreateEpisode {
  name: string;
  code: string;
}
