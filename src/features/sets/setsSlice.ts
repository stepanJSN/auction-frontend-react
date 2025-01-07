import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import { IGetSetsResponse, ISet } from '../../types/sets.interface';

export interface SetsState {
  sets: {
    [page: number]: ISet[] | null;
  };
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: SetsState = {
  sets: {},
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
    getSets: (state, _action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getSetsSuccess: (state, action: PayloadAction<IGetSetsResponse | null>) => {
      state.status = QueryStatusEnum.SUCCESS;
      if (action.payload) {
        state.sets[state.currentPage] = action.payload.data;
        state.totalPages = action.payload.info.totalPages;
      }
    },

    getSetsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    resetLastPage: (state) => {
      state.sets[state.totalPages] = null;
    },

    resetCurrentPage: (state) => {
      state.sets[state.currentPage] = null;
    },
  },
});

export const {
  getSets,
  getSetsSuccess,
  getSetsError,
  changeSetsPage,
  resetCurrentPage,
  resetLastPage,
} = setsSlice.actions;
export const selectSets = createSelector(
  (state: RootState) => state.sets,
  (sets) => ({
    sets: sets.sets[sets.currentPage],
    totalPages: sets.totalPages,
    currentPage: sets.currentPage,
    status: sets.status,
  }),
);

export const selectIsPageLoaded = createSelector(
  (state: RootState) => state.sets,
  (sets) => !!sets.sets[sets.currentPage],
);

export default setsSlice.reducer;
