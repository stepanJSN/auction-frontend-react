import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getExchangeRate,
  setExchangeRate,
  setExchangeRateError,
  setUpdateExchangeRateStatusError,
  setUpdateExchangeRateStatusSuccess,
  updateExchangeRate,
} from './systemSlice';
import { systemService } from '../../services/systemService';
import { IExchangeRate } from '../../types/system.interfaces';
import { PayloadAction } from '@reduxjs/toolkit';

function* getExchangeRateSaga() {
  try {
    const exchangeRate: IExchangeRate = yield call(
      systemService.getExchangeRate,
    );
    yield put(setExchangeRate(exchangeRate));
  } catch {
    yield put(setExchangeRateError());
  }
}

function* updateExchangeRateSaga(action: PayloadAction<number>) {
  try {
    const exchangeRate: IExchangeRate = yield call(
      systemService.updateExchangeRate,
      {
        exchangeRate: action.payload,
      },
    );
    yield put(setExchangeRate(exchangeRate));
    yield put(setUpdateExchangeRateStatusSuccess());
  } catch {
    yield put(setUpdateExchangeRateStatusError());
  }
}

export function* watchSystemSaga() {
  yield takeLatest(getExchangeRate.type, getExchangeRateSaga);
  yield takeLatest(updateExchangeRate.type, updateExchangeRateSaga);
}
