import { call, put, takeLatest } from 'redux-saga/effects';
import { getSets, getSetsError, getSetsSuccess } from './setsSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IGetSetsResponse } from '../../types/sets.interface';
import { setsService } from '../../services/setsService';

function* getSetsSaga(action: PayloadAction<number>) {
  try {
    const sets: IGetSetsResponse = yield call(
      setsService.getAll,
      action.payload,
    );
    yield put(getSetsSuccess(sets));
  } catch {
    yield put(getSetsError());
  }
}

export function* watchSetsSaga() {
  yield takeLatest(getSets.type, getSetsSaga);
}
