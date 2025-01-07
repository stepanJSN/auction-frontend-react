import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import {
  AuctionSortByEnum,
  IAuctionSummary,
  IGetAuctionsResponse,
} from '../../types/auctions.interfaces';
import { ILocation } from '../../types/locations.interfaces';
import { SortOrderEnum } from '../../enums/sortOrder.enum';

export interface AuctionsState {
  auctions: IAuctionSummary[] | null;
  filters: {
    location: ILocation | null;
    cardName: string;
    priceRange: [number | null, number | null];
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
  auctions: null,
  filters: {
    location: null,
    cardName: '',
    priceRange: [null, null],
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

    getAuctions: (state, _action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
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
      state.filters.priceRange = action.payload;
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

    updateCurrentPage: (state) => {
      state.status = QueryStatusEnum.LOADING;
    },
  },
});

export const {
  setPage,
  getAuctions,
  getAuctionsSuccess,
  getAuctionsError,
  updateCurrentPage,
  setLocation,
  setCardName,
  setShowOnlyWhereUserTakePart,
  setShowOnlyWhereUserIsLeader,
  setSortOrder,
  setSortBy,
  setPriceRange,
} = auctionsSlice.actions;

export const selectFilters = (state: RootState) => state.auctions.filters;

export default auctionsSlice.reducer;
