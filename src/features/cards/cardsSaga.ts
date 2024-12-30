import { call, put, select, takeLatest } from 'redux-saga/effects';
import { cardsService } from '../../services/cardsService';
import { IGetCardsResponse } from '../../types/cards.interface';
import {
  getCards,
  getCardsError,
  getCardsSuccess,
  selectIsPageLoaded,
} from './cardsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getCardsSaga(action: PayloadAction<number>) {
  const isPageLoaded: boolean = yield select(selectIsPageLoaded);
  if (isPageLoaded) {
    yield put(getCardsSuccess(null));
    return;
  }
  try {
    const userCards: IGetCardsResponse = yield call(
      cardsService.getAll,
      action.payload,
    );
    yield put(getCardsSuccess(userCards));
  } catch {
    yield put(getCardsError());
  }
}

export function* watchCardsSaga() {
  yield takeLatest(getCards.type, getCardsSaga);
}
