
import { call, put, takeLatest } from "redux-saga/effects";
import { IUser } from "../../types/userService.interfaces";
import { userService } from "../../services/userService";
import { PayloadAction } from "@reduxjs/toolkit";
import { getUser, getUserError, getUserSuccess } from "./userSlice";
import { AxiosError } from "axios";
import { ErrorCodesEnum } from "../../enums/errorCodes.enum";

function* getUserSaga(action: PayloadAction<string>) {
  try {
    const userData: IUser = yield call(userService.getOne, action.payload);
    yield put(getUserSuccess(userData));
  } catch (error) {
    yield put(getUserError((error as AxiosError).status || ErrorCodesEnum.ServerError));
  }
}

export function* watchUserSaga() {
  yield takeLatest(getUser.type, getUserSaga);
}
