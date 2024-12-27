import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { ICardSummary } from '../../types/cards.interface';

export interface UserCardsState {
  cards: {
    [page: number]: ICardSummary[];
  };
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: UserCardsState = {
  cards: {},
  totalPages: 0,
  currentPage: 1,
  status: QueryStatusEnum.IDLE,
};

export const userCardsSlice = createSlice({
  name: 'userCards',
  initialState,
  reducers: {
    getCards: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = action.payload;
    },

    getCardsSuccess: (
      state,
      action: PayloadAction<{ cards: ICardSummary[]; totalPages: number }>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.cards[state.currentPage] = action.payload.cards;
      state.totalPages = action.payload.totalPages;
    },

    getCardsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },
  },
});
