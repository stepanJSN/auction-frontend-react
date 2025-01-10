import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { QueryStatusEnum } from '../../../enums/queryStatus.enum';
import { IAuction } from '../../../types/auctions.interfaces';
import { RootState } from '../../../redux/store';
import { ICreateBid } from '../../../types/bids.interfaces';
import { IAuctionEvent } from '../auctionEvents.interfaces';

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

    updateHighestBid: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.highest_bid = {
          amount: action.payload,
          is_this_user_bid: false,
        };
      }
    },

    updateAuction: (state, action: PayloadAction<IAuctionEvent['payload']>) => {
      if (state.data) {
        if (action.payload.startingBid)
          state.data.starting_bid = action.payload.startingBid;
        if (action.payload.minBidStep)
          state.data.min_bid_step = action.payload.minBidStep;
        if (action.payload.maxBid) state.data.max_bid = action.payload.maxBid;
        if (action.payload.endTime)
          state.data.end_time = action.payload.endTime;
        if (action.payload.minLength)
          state.data.min_length = action.payload.minLength;
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
  updateHighestBid,
  updateAuction,
  finishAuction,
  resetBidCreationStatus,
} = auctionSlice.actions;

export const selectAuction = (state: RootState) => state.auction;

export default auctionSlice.reducer;
