import { call, put, select, takeLatest } from 'redux-saga/effects';
import { cardsService } from '../../services/cardsService';
import { IGetCardsResponse } from '../../types/cards.interface';
import {
  getCards,
  getCardsError,
  getCardsSuccess,
  selectIsPageLoaded,
} from './userCardsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getUserCardsSaga(action: PayloadAction<number>) {
  const isPageLoaded: boolean = yield select(selectIsPageLoaded);
  if (isPageLoaded) {
    yield put(getCardsSuccess(null));
    return;
  }
  try {
    const userCards: IGetCardsResponse = yield call(cardsService.getAll, {
      page: action.payload,
      onlyUserCards: true,
    });
    yield put(getCardsSuccess(userCards));
  } catch {
    yield put(getCardsError());
  }
}

export function* watchUserCardsSaga() {
  yield takeLatest(getCards.type, getUserCardsSaga);
}
