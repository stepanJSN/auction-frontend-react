import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  changeSetsPage,
  getSets,
  getSetsError,
  getSetsSuccess,
} from './setsSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IGetSetsResponse } from '../../types/sets.interface';
import { setsService } from '../../services/setsService';
import { RootState } from '../../redux/store';

export function* getSetsSaga(action: PayloadAction<number | undefined>) {
  const currentPage: number = yield select(
    (state: RootState) => state.sets.currentPage,
  );
  try {
    const sets: IGetSetsResponse = yield call(
      setsService.getAll,
      action.payload ?? currentPage,
    );
    yield put(getSetsSuccess(sets));
  } catch {
    yield put(getSetsError());
  }
}

export function* watchSetsSaga() {
  yield takeLatest(getSets.type, getSetsSaga);
  yield takeLatest(changeSetsPage.type, getSetsSaga);
}
