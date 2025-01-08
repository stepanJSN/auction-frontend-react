import { call, debounce, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import {
  AuctionsState,
  getAuctions,
  getAuctionsError,
  getAuctionsSuccess,
  getPriceRange,
  getPriceRangeSuccess,
  selectFilters,
  setCardName,
  setLocation,
  setPriceRange,
  setShowOnlyWhereUserIsLeader,
  setShowOnlyWhereUserTakePart,
  setSortBy,
  setSortOrder,
} from './AuctionsSlice';
import {
  IGetAuctionsResponse,
  IPriceRange,
} from '../../types/auctions.interfaces';
import { auctionService } from '../../services/auctionService';

function* getAuctionsSaga(action: PayloadAction<number | undefined>) {
  const currentPage: number = yield select(
    (state: RootState) => state.auctions.currentPage,
  );
  const filters: AuctionsState['filters'] = yield select(selectFilters);
  try {
    const auctions: IGetAuctionsResponse = yield call(auctionService.findAll, {
      page: action.payload ?? currentPage,
      locationId: filters.location?.id,
      isUserTakePart: filters.showOnlyWhereUserTakePart ? true : undefined,
      isUserLeader: filters.showOnlyWhereUserIsLeader ? true : undefined,
      cardName: filters.cardName,
      fromPrice: filters.price.range[0]!,
      toPrice: filters.price.range[1]!,
    });
    yield put(getAuctionsSuccess(auctions));
  } catch {
    yield put(getAuctionsError());
  }
}

function* setAuctionsFiltersSaga() {
  const currentPage: number = yield select(
    (state: RootState) => state.auctions.currentPage,
  );
  const filters: AuctionsState['filters'] = yield select(selectFilters);
  try {
    const auctions: IGetAuctionsResponse = yield call(auctionService.findAll, {
      page: currentPage,
      locationId: filters.location?.id,
      isUserTakePart: filters.showOnlyWhereUserTakePart ? true : undefined,
      isUserLeader: filters.showOnlyWhereUserIsLeader ? true : undefined,
      cardName: filters.cardName,
      fromPrice: filters.price.range[0]!,
      toPrice: filters.price.range[1]!,
    });
    yield put(getAuctionsSuccess(auctions));
  } catch {
    yield put(getAuctionsError());
  }
}

function* getPriceRangeSaga() {
  try {
    const priceRange: IPriceRange = yield call(auctionService.findPriceRange);
    yield put(getPriceRangeSuccess(priceRange));
  } catch (error) {
    console.error(error);
  }
}

export function* watchAuctionsSaga() {
  yield takeLatest(getAuctions.type, getAuctionsSaga);
  yield debounce(
    500,
    [
      setLocation.type,
      setCardName.type,
      setPriceRange.type,
      setShowOnlyWhereUserTakePart.type,
      setShowOnlyWhereUserIsLeader.type,
      setSortOrder.type,
      setSortBy.type,
    ],
    setAuctionsFiltersSaga,
  );
  yield takeLatest(getPriceRange.type, getPriceRangeSaga);
}
