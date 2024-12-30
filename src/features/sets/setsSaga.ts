import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getSets,
  getSetsError,
  getSetsSuccess,
  selectIsPageLoaded,
} from './setsSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IGetSetsResponse } from '../../types/sets.interface';
import { setsService } from '../../services/setsService';

function* getSetsSaga(action: PayloadAction<number>) {
  const isPageLoaded: boolean = yield select(selectIsPageLoaded);
  if (isPageLoaded) {
    yield put(getSetsSuccess(null));
    return;
  }
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
