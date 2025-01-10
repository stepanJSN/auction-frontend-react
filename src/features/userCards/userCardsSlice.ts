import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { ICardSummary, IGetCardsResponse } from '../../types/cards.interface';
import { RootState } from '../../redux/store';

export interface UserCardsState {
  cards: ICardSummary[] | null;
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: UserCardsState = {
  cards: null,
  totalPages: 0,
  currentPage: 1,
  status: QueryStatusEnum.IDLE,
};

export const userCardsSlice = createSlice({
  name: 'userCards',
  initialState,
  reducers: {
    changeUserCardsPage: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = action.payload;
    },

    getCards: (state) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getCardsSuccess: (state, action: PayloadAction<IGetCardsResponse>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.cards = action.payload.data;
      state.totalPages = action.payload.info.totalPages;
    },

    getCardsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },
  },
});

export const { getCards, getCardsSuccess, getCardsError, changeUserCardsPage } =
  userCardsSlice.actions;
export const selectUserCards = createSelector(
  (state: RootState) => state.userCards,
  (userCards) => ({
    cards: userCards.cards,
    totalPages: userCards.totalPages,
    currentPage: userCards.currentPage,
    status: userCards.status,
  }),
);

export default userCardsSlice.reducer;
