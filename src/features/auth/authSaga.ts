import { call, put, takeLatest } from "redux-saga/effects";
import { logout, signin, signinError, signinSuccess } from "./authSlice";
import { authService } from "../../services/authService";
import { ISingInRequest, ISingInResponse } from "../../types/authService.interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ErrorCodesEnum } from "../../enums/errorCodes.enum";

function* signinSaga(action: PayloadAction<ISingInRequest>) {
  try {
    const authResponse: ISingInResponse = yield call(authService.signIn, action.payload);
    yield put(signinSuccess(authResponse));
  } catch (error) {
    yield put(signinError((error as AxiosError).status || ErrorCodesEnum.ServerError));
  }
}

function* logoutSaga() {
  yield call(authService.logout);
}

export function* watchAuthSaga() {
  yield takeLatest(signin.type, signinSaga);
  yield takeLatest(logout.type, logoutSaga);
}
