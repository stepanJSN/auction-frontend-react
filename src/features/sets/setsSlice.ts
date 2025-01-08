import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import { IGetSetsResponse, ISet } from '../../types/sets.interface';

export interface SetsState {
  sets: ISet[] | null;
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: SetsState = {
  sets: null,
  totalPages: 0,
  currentPage: 1,
  status: QueryStatusEnum.IDLE,
};

export const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    changeSetsPage: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = action.payload;
    },
    getSets: (state, _action: PayloadAction<number | undefined>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getSetsSuccess: (state, action: PayloadAction<IGetSetsResponse>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.sets = action.payload.data;
      state.totalPages = action.payload.info.totalPages;
    },

    getSetsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },
  },
});

export const { getSets, getSetsSuccess, getSetsError, changeSetsPage } =
  setsSlice.actions;
export const selectSets = createSelector(
  (state: RootState) => state.sets,
  (sets) => ({
    sets: sets.sets,
    totalPages: sets.totalPages,
    currentPage: sets.currentPage,
    status: sets.status,
  }),
);

export default setsSlice.reducer;
