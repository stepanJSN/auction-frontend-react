import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { ICardSummary, IGetCardsResponse } from '../../types/cards.interface';
import { RootState } from '../../redux/store';

export interface CardsState {
  cards: ICardSummary[] | null;
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: CardsState = {
  cards: null,
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
        state.cards = action.payload.data;
        state.totalPages = action.payload.info.totalPages;
      }
    },

    getCardsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },
  },
});

export const { getCards, getCardsSuccess, getCardsError, changeCardsPage } =
  cardsSlice.actions;
export const selectCards = createSelector(
  (state: RootState) => state.cards,
  (cards) => ({
    cards: cards.cards,
    totalPages: cards.totalPages,
    currentPage: cards.currentPage,
    status: cards.status,
  }),
);

export default cardsSlice.reducer;
