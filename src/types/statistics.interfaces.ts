import { IPagination } from './pagination.interface';

export interface IGeneralStatistics {
  mostRepeatedCard: {
    id: string;
    name: string;
    numberOfInstances: number;
  };
  leastRepeatedCard: {
    id: string;
    name: string;
    numberOfInstances: number;
  };
  numberOfCardsCreatedByAdmin: number;
}

export interface ICardsStatistics {
  id: string;
  cardName: string;
  numberOfInstances: number;
  averagePrice: number;
}

export interface ICardsStatisticsResponse {
  data: ICardsStatistics[];
  info: IPagination;
}

export interface IUsersStatistics {
  id: string;
  name: string;
  surname: string;
  numberOfCards: number;
}

export interface ISetsStatistics {
  id: string;
  setName: string;
  numberOfUsers: number;
}

export interface ISetsStatisticsResponse {
  data: ISetsStatistics[];
  info: IPagination;
}
