import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { ICardSummary, IGetCardsResponse } from '../../types/cards.interface';
import { RootState } from '../../redux/store';

export interface CardsState {
  cards: {
    [page: number]: ICardSummary[] | null;
  };
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: CardsState = {
  cards: {},
  totalPages: 0,
  currentPage: 1,
  status: QueryStatusEnum.IDLE,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    changeCardsPage: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = action.payload;
    },

    getCards: (state, _action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getCardsSuccess: (
      state,
      action: PayloadAction<IGetCardsResponse | null>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
      if (action.payload) {
        state.cards[state.currentPage] = action.payload.data;
        state.totalPages = action.payload.info.totalPages;
      }
    },

    getCardsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    resetLastPage: (state) => {
      state.cards[state.totalPages] = null;
    },

    resetCurrentPage: (state) => {
      state.cards[state.currentPage] = null;
    },
  },
});

export const {
  getCards,
  getCardsSuccess,
  getCardsError,
  changeCardsPage,
  resetLastPage,
  resetCurrentPage,
} = cardsSlice.actions;
export const selectCards = createSelector(
  (state: RootState) => state.cards,
  (cards) => ({
    cards: cards.cards[cards.currentPage],
    totalPages: cards.totalPages,
    currentPage: cards.currentPage,
    status: cards.status,
  }),
);

export const selectIsPageLoaded = createSelector(
  (state: RootState) => state.cards,
  (cards) => !!cards.cards[cards.currentPage],
);

export default cardsSlice.reducer;
