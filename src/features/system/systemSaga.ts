import { call, put, takeLatest } from 'redux-saga/effects';
import { paymentService } from '../../services/paymentService';
import {
  getExchangeRate,
  setExchangeRate,
  setExchangeRateError,
} from './systemSlice';

function* getExchangeRateSaga() {
  try {
    const exchangeRate: number = yield call(paymentService.getExchangeRate);
    yield put(setExchangeRate(exchangeRate));
  } catch {
    yield put(setExchangeRateError());
  }
}

export function* watchSystemSaga() {
  yield takeLatest(getExchangeRate.type, getExchangeRateSaga);
}
