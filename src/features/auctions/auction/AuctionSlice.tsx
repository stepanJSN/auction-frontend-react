import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { QueryStatusEnum } from '../../../enums/queryStatus.enum';
import { IAuction, IUpdateAuction } from '../../../types/auctions.interfaces';
import { RootState } from '../../../redux/store';
import { ICreateBid } from '../../../types/bids.interfaces';

export interface AuctionState {
  data: IAuction | null;
  status: QueryStatusEnum;
  bidCreationStatus: MutationStatusEnum;
  bidCreationErrorCode: number | null;
}

const initialState: AuctionState = {
  data: null,
  status: QueryStatusEnum.IDLE,
  bidCreationStatus: MutationStatusEnum.IDLE,
  bidCreationErrorCode: null,
};

export const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    getAuction: (state, _action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getAuctionSuccess: (state, action: PayloadAction<IAuction>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.data = action.payload;
    },

    getAuctionError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    createBid: (state, _action: PayloadAction<ICreateBid>) => {
      state.bidCreationStatus = MutationStatusEnum.PENDING;
    },

    createBidSuccess: (state, action: PayloadAction<number>) => {
      state.bidCreationStatus = MutationStatusEnum.SUCCESS;
      if (state.data) {
        state.data.highest_bid = {
          amount: action.payload,
          is_this_user_bid: true,
        };
      }
    },

    createBidError: (state, action: PayloadAction<number>) => {
      state.bidCreationStatus = MutationStatusEnum.ERROR;
      state.bidCreationErrorCode = action.payload;
    },

    resetBidCreationStatus: (state) => {
      state.bidCreationStatus = MutationStatusEnum.IDLE;
      state.bidCreationErrorCode = null;
    },

    newBid: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.highest_bid = {
          amount: action.payload,
          is_this_user_bid: false,
        };
      }
    },

    updateAction: (state, action: PayloadAction<IUpdateAuction>) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
        };
      }
    },

    finishAuction: (state) => {
      if (state.data) {
        state.data.is_completed = true;
      }
    },
  },
});

export const {
  getAuction,
  getAuctionSuccess,
  getAuctionError,
  createBid,
  createBidSuccess,
  createBidError,
  newBid,
  updateAction,
  finishAuction,
  resetBidCreationStatus,
} = auctionSlice.actions;

export const selectAuction = (state: RootState) => state.auction;

export default auctionSlice.reducer;
