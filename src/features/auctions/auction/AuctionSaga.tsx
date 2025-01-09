import { PayloadAction } from '@reduxjs/toolkit';
import { auctionService } from '../../../services/auctionService';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { IAuction } from '../../../types/auctions.interfaces';
import {
  createBid,
  createBidError,
  createBidSuccess,
  getAuction,
  getAuctionError,
  getAuctionSuccess,
  resetBidCreationStatus,
} from './AuctionSlice';
import { ICreateBid } from '../../../types/bids.interfaces';
import { bidsService } from '../../../services/bidsService';
import { ErrorCodesEnum } from '../../../enums/errorCodes.enum';
import { AxiosError } from 'axios';
import { getUser } from '../../user/userSlice';

const NOTIFICATION_TIMEOUT = 3000;

function* getAuctionSaga(action: PayloadAction<string>) {
  try {
    const auction: IAuction = yield call(
      auctionService.findOne,
      action.payload,
    );
    yield put(getAuctionSuccess(auction));
  } catch {
    yield put(getAuctionError());
  }
}

function* createBidSaga(action: PayloadAction<ICreateBid>) {
  try {
    const auction: number = yield call(bidsService.create, action.payload);
    yield put(createBidSuccess(auction));
    yield put(getUser());
  } catch (error) {
    yield put(
      createBidError(
        ((error as AxiosError).response?.data.code as number) ||
          ErrorCodesEnum.ServerError,
      ),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetBidCreationStatus());
  }
}

export function* watchAuctionSaga() {
  yield takeLatest(getAuction.type, getAuctionSaga);
  yield takeLatest(createBid.type, createBidSaga);
}
