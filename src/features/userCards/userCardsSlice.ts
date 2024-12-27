import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

    getCardsSuccess: (state, action: PayloadAction<IGetCardsResponse>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.cards[state.currentPage] = action.payload.data;
      state.totalPages = action.payload.info.totalPages;
    },

    getCardsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },
  },
});

export const { getCards, getCardsSuccess, getCardsError } =
  userCardsSlice.actions;

export const selectUserCards = (state: RootState) => state.userCards;
export default userCardsSlice.reducer;
