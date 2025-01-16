import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import {
  ICardsStatistics,
  ICardsStatisticsResponse,
  IGeneralStatistics,
  ISetsStatistics,
  ISetsStatisticsResponse,
  IUsersStatistics,
} from '../../types/statistics.interfaces';
import { RootState } from '../../redux/store';

export enum StatisticsTabs {
  CARDS = 'cards',
  SETS = 'sets',
  USERS = 'users',
}

export interface StatisticsState {
  general: {
    data: IGeneralStatistics | null;
    status: QueryStatusEnum;
  };
  selectedTab: StatisticsTabs;
  cards: {
    data: ICardsStatistics[] | null;
    totalPages: number;
    currentPage: number;
    status: QueryStatusEnum;
  };

  sets: {
    data: ISetsStatistics[] | null;
    totalPages: number;
    currentPage: number;
    status: QueryStatusEnum;
  };

  users: {
    data: IUsersStatistics[] | null;
    numberOfUsers: number;
    status: QueryStatusEnum;
  };
}

const initialState: StatisticsState = {
  general: {
    data: null,
    status: QueryStatusEnum.IDLE,
  },
  selectedTab: StatisticsTabs.CARDS,
  cards: {
    data: null,
    totalPages: 1,
    currentPage: 1,
    status: QueryStatusEnum.IDLE,
  },
  sets: {
    data: null,
    totalPages: 1,
    currentPage: 1,
    status: QueryStatusEnum.IDLE,
  },
  users: {
    data: null,
    numberOfUsers: 10,
    status: QueryStatusEnum.IDLE,
  },
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    getGeneralStatistics: (state) => {
      state.general.status = QueryStatusEnum.LOADING;
    },

    setGeneralStatisticsSuccess: (
      state,
      action: PayloadAction<IGeneralStatistics>,
    ) => {
      state.general.status = QueryStatusEnum.SUCCESS;
      state.general.data = action.payload;
    },

    setGeneralStatisticsError: (state) => {
      state.general.status = QueryStatusEnum.ERROR;
    },

    getCardsStatistics: (state, _action: PayloadAction<number>) => {
      state.cards.status = QueryStatusEnum.LOADING;
    },

    setCardsStatisticsSuccess: (
      state,
      action: PayloadAction<ICardsStatisticsResponse>,
    ) => {
      state.cards.status = QueryStatusEnum.SUCCESS;
      state.cards.data = action.payload.data;
      state.cards.totalPages = action.payload.info.totalPages;
    },

    setCardsStatisticsError: (state) => {
      state.cards.status = QueryStatusEnum.ERROR;
    },

    changeCardsStatisticsPage: (state, action: PayloadAction<number>) => {
      state.cards.currentPage = action.payload;
    },

    getSetsStatistics: (state, _action: PayloadAction<number>) => {
      state.sets.status = QueryStatusEnum.LOADING;
    },

    setSetsStatisticsSuccess: (
      state,
      action: PayloadAction<ISetsStatisticsResponse>,
    ) => {
      state.sets.status = QueryStatusEnum.SUCCESS;
      state.sets.data = action.payload.data;
      state.sets.totalPages = action.payload.info.totalPages;
    },

    setSetsStatisticsError: (state) => {
      state.sets.status = QueryStatusEnum.ERROR;
    },

    changeSetsStatisticsPage: (state, action: PayloadAction<number>) => {
      state.sets.currentPage = action.payload;
    },

    getUsersStatistics: (state, _action: PayloadAction<number>) => {
      state.users.status = QueryStatusEnum.LOADING;
    },

    setUsersStatisticsSuccess: (
      state,
      action: PayloadAction<IUsersStatistics[]>,
    ) => {
      state.users.status = QueryStatusEnum.SUCCESS;
      state.users.data = action.payload;
    },

    setUsersStatisticsError: (state) => {
      state.users.status = QueryStatusEnum.ERROR;
    },

    changeNumberOfUsersInStatistics: (state, action: PayloadAction<number>) => {
      state.users.numberOfUsers = action.payload;
    },
  },
});

export const {
  getGeneralStatistics,
  setGeneralStatisticsSuccess,
  setGeneralStatisticsError,
  getCardsStatistics,
  setCardsStatisticsSuccess,
  setCardsStatisticsError,
  changeCardsStatisticsPage,
  getSetsStatistics,
  setSetsStatisticsSuccess,
  setSetsStatisticsError,
  changeSetsStatisticsPage,
  getUsersStatistics,
  setUsersStatisticsSuccess,
  setUsersStatisticsError,
  changeNumberOfUsersInStatistics,
} = statisticsSlice.actions;

export const selectGeneralStatistics = createSelector(
  (state: RootState) => state.statistics,
  (statistics) => ({
    general: statistics.general,
    selectedTab: statistics.selectedTab,
  }),
);
export const selectCardsStatistics = (state: RootState) =>
  state.statistics.cards;
export const selectSetsStatistics = (state: RootState) => state.statistics.sets;
export const selectUsersStatistics = (state: RootState) =>
  state.statistics.users;

export default statisticsSlice.reducer;
