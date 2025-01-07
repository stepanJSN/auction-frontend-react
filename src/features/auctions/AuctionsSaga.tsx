import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import {
  AuctionsState,
  getAuctions,
  getAuctionsError,
  getAuctionsSuccess,
  selectFilters,
} from './AuctionsSlice';
import { IGetAuctionsResponse } from '../../types/auctions.interfaces';
import { auctionService } from '../../services/auctionService';

function* getAuctionsSaga(action: PayloadAction<number | undefined>) {
  const currentPage: number = yield select(
    (state: RootState) => state.auctions.currentPage,
  );
  const filters: Pick<AuctionsState, 'filters'> = yield select(selectFilters);
  try {
    const auctions: IGetAuctionsResponse = yield call(auctionService.findAll, {
      page: action.payload ?? currentPage,
      ...filters,
    });
    yield put(getAuctionsSuccess(auctions));
  } catch {
    yield put(getAuctionsError());
  }
}

export function* watchAuctionsSaga() {
  yield takeLatest(getAuctions.type, getAuctionsSaga);
}
