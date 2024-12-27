import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { ICardSummary, IGetCardsResponse } from '../../types/cards.interface';
import { RootState } from '../../redux/store';

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
  },
});

export const { getCards, getCardsSuccess, getCardsError } =
  userCardsSlice.actions;
export const selectUserCards = createSelector(
  (state: RootState) => state.userCards,
  (userCards) => ({
    cards: userCards.cards[userCards.currentPage],
    totalPages: userCards.totalPages,
    currentPage: userCards.currentPage,
    status: userCards.status,
  }),
);

export const selectIsPageLoaded = createSelector(
  (state: RootState) => state.userCards,
  (userCards) => !!userCards.cards[userCards.currentPage],
);

export default userCardsSlice.reducer;
