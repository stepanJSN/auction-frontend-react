import { call, put, takeLatest } from 'redux-saga/effects';
import { signin, signinError, signinSuccess } from './authSlice';
import { authService } from '../../services/authService';
import {
  ISingInRequest,
  ISingInResponse,
} from '../../types/auth.interfaces';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ErrorCodesEnum } from '../../enums/errorCodes.enum';
import { RESET_ACTION } from '../../redux/rootReducer';

function* signinSaga(action: PayloadAction<ISingInRequest>) {
  try {
    const authResponse: ISingInResponse = yield call(
      authService.signIn,
      action.payload,
    );
    yield put(signinSuccess(authResponse));
  } catch (error) {
    yield put(
      signinError((error as AxiosError).status || ErrorCodesEnum.ServerError),
    );
  }
}

function* logoutSaga() {
  yield call(authService.logout);
}

export function* watchAuthSaga() {
  yield takeLatest(signin.type, signinSaga);
  yield takeLatest(RESET_ACTION, logoutSaga);
}
