import { IPagination } from './pagination.interface';

export interface IGeneralStatistics {
  mostRepeatedCard: {
    id: string;
    name: string;
    numberOfInstances: never;
  };
  leastRepeatedCard: {
    id: string;
    name: string;
    numberOfInstances: never;
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
  cards: ICardsStatistics[];
  info: IPagination;
}

export interface IUsersStatistics {
  id: string;
  name: string;
  surname: string;
  numberOfCards: never;
}

export interface IUsersStatisticsResponse {
  users: IUsersStatistics[];
}

export interface ISetsStatistics {
  id: string;
  setName: string;
  numberOfUsers: number;
}

export interface ISetsStatisticsResponse {
  sets: ISetsStatistics[];
  info: IPagination;
}
