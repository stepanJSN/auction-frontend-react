import { call, put, takeLatest } from 'redux-saga/effects';
import { cardsService } from '../../services/cardsService';
import { IGetCardsResponse } from '../../types/cards.interface';
import { getCards, getCardsError, getCardsSuccess } from './userCardsSlice';

function* getUserCardsSaga() {
  try {
    const userCards: IGetCardsResponse = yield call(cardsService.getUserCards);
    yield put(getCardsSuccess(userCards));
  } catch {
    yield put(getCardsError());
  }
}

export function* watchUserCardsSaga() {
  yield takeLatest(getCards.type, getUserCardsSaga);
}
