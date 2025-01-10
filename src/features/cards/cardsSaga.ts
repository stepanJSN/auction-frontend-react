import { call, put, select, takeLatest } from 'redux-saga/effects';
import { cardsService } from '../../services/cardsService';
import { IGetCardsResponse } from '../../types/cards.interface';
import {
  changeCardsPage,
  getCards,
  getCardsError,
  getCardsSuccess,
} from './cardsSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

function* getCardsSaga(action: PayloadAction<number | undefined>) {
  const currentPage: number = yield select(
    (state: RootState) => state.cards.currentPage,
  );
  try {
    const cards: IGetCardsResponse = yield call(cardsService.getAll, {
      page: action.payload ?? currentPage,
    });
    yield put(getCardsSuccess(cards));
  } catch {
    yield put(getCardsError());
  }
}

export function* watchCardsSaga() {
  yield takeLatest(getCards.type, getCardsSaga);
  yield takeLatest(changeCardsPage.type, getCardsSaga);
}
