import { call, put, takeLatest } from 'redux-saga/effects';
import { cardsService } from '../../services/cardsService';
import { IGetCardsResponse } from '../../types/cards.interface';
import { getCards, getCardsError, getCardsSuccess } from './cardsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getCardsSaga(action: PayloadAction<number>) {
  try {
    const cards: IGetCardsResponse = yield call(cardsService.getAll, {
      page: action.payload,
    });
    yield put(getCardsSuccess(cards));
  } catch {
    yield put(getCardsError());
  }
}

export function* watchCardsSaga() {
  yield takeLatest(getCards.type, getCardsSaga);
}
