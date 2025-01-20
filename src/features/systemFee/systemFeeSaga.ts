import { call, put, takeLatest } from 'redux-saga/effects';
import { transactionsService } from '../../services/transactionsService';
import {
  getSystemFee,
  setSystemFeeError,
  setSystemFeeSuccess,
} from './systemFeeSlice';

function* getSystemFeeSaga() {
  try {
    const systemFee: number = yield call(transactionsService.getFeeAmount);
    yield put(setSystemFeeSuccess(systemFee));
  } catch {
    yield put(setSystemFeeError());
  }
}

export function* watchSystemFeeSaga() {
  yield takeLatest(getSystemFee.type, getSystemFeeSaga);
}
