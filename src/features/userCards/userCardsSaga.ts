import { call, put, takeLatest } from 'redux-saga/effects';
import { cardsService } from '../../services/cardsService';
import { IGetCardsResponse } from '../../types/cards.interface';
import { getCards, getCardsError, getCardsSuccess } from './userCardsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getUserCardsSaga(action: PayloadAction<number>) {
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
