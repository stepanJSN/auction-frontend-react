import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import {
  AuctionSortByEnum,
  IAuctionSummary,
  IGetAuctionsResponse,
  IPriceRange,
} from '../../types/auctions.interfaces';
import { ILocation } from '../../types/locations.interfaces';
import { SortOrderEnum } from '../../enums/sortOrder.enum';

export interface AuctionsState {
  auctions: IAuctionSummary[];
  filters: {
    location: ILocation | null;
    cardName: string;
    price: {
      min: number | null;
      max: number | null;
      range: [number | null, number | null];
    };
    showOnlyWhereUserTakePart: boolean;
    showOnlyWhereUserIsLeader: boolean;
    sortOrder: SortOrderEnum;
    sortBy: AuctionSortByEnum;
  };
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: AuctionsState = {
  auctions: [],
  filters: {
    location: null,
    cardName: '',
    price: {
      min: null,
      max: null,
      range: [null, null],
    },
    showOnlyWhereUserTakePart: false,
    showOnlyWhereUserIsLeader: false,
    sortOrder: SortOrderEnum.ASC,
    sortBy: AuctionSortByEnum.CREATION_DATE,
  },
  totalPages: 0,
  currentPage: 1,
  status: QueryStatusEnum.IDLE,
};

export const auctionsSlice = createSlice({
  name: 'auctions',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = action.payload;
    },

    getAuctions: (state, _action: PayloadAction<number | undefined>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getPriceRangeSuccess: (state, action: PayloadAction<IPriceRange>) => {
      state.filters.price.min = action.payload.min;
      state.filters.price.max = action.payload.max;
      state.filters.price.range = [action.payload.min, action.payload.max];
    },

    setLocation: (state, action: PayloadAction<ILocation | null>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.location = action.payload;
    },

    setCardName: (state, action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.cardName = action.payload;
    },

    setShowOnlyWhereUserTakePart: (state, action: PayloadAction<boolean>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.showOnlyWhereUserTakePart = action.payload;
    },

    setShowOnlyWhereUserIsLeader: (state, action: PayloadAction<boolean>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.showOnlyWhereUserIsLeader = action.payload;
    },

    setSortOrder: (state, action: PayloadAction<SortOrderEnum>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.sortOrder = action.payload;
    },

    setSortBy: (state, action: PayloadAction<AuctionSortByEnum>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.sortBy = action.payload;
    },

    setPriceRange: (
      state,
      action: PayloadAction<[number | null, number | null]>,
    ) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.price.range = action.payload;
    },

    getAuctionsSuccess: (
      state,
      action: PayloadAction<IGetAuctionsResponse>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.auctions = action.payload.data;
      state.totalPages = action.payload.info.totalPages;
    },

    getAuctionsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    resetFilters: (state) => {
      state.filters = {
        ...initialState.filters,
        price: {
          min: state.filters.price.min,
          max: state.filters.price.max,
          range: [state.filters.price.min, state.filters.price.max],
        },
      };
    },
  },
});

export const {
  setPage,
  getAuctions,
  getAuctionsSuccess,
  getAuctionsError,
  getPriceRangeSuccess,
  setLocation,
  setCardName,
  setShowOnlyWhereUserTakePart,
  setShowOnlyWhereUserIsLeader,
  setSortOrder,
  setSortBy,
  setPriceRange,
  resetFilters,
} = auctionsSlice.actions;

export const getPriceRange = createAction('actions/getPriceRange');

export const selectFilters = (state: RootState) => state.auctions.filters;
export const selectAuctions = (state: RootState) => state.auctions;

export default auctionsSlice.reducer;
