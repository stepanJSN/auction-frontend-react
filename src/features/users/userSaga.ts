import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { IUpdateUser, IUser } from '../../types/userService.interfaces';
import { userService } from '../../services/userService';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getUser,
  getUserError,
  getUserSuccess,
  updateUserSuccess,
  updateUserError,
  resetUpdateUserStatus,
  deleteUser,
  deleteUserSuccess,
  deleteUserError,
  resetDeleteUserStatus,
  updateUser,
} from './userSlice';
import { AxiosError } from 'axios';
import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

const NOTIFICATION_TIMEOUT = 3000;

function* getUserSaga(action: PayloadAction<string>) {
  try {
    const userData: IUser = yield call(userService.getOne, action.payload);
    yield put(getUserSuccess(userData));
  } catch (error) {
    yield put(
      getUserError((error as AxiosError).status || ErrorCodesEnum.ServerError),
    );
  }
}

function* updateUserSaga(
  action: PayloadAction<{ id: string; data: IUpdateUser }>,
) {
  try {
    const userData: IUser = yield call(
      userService.update,
      action.payload.id,
      action.payload.data,
    );
    yield put(updateUserSuccess(userData));
  } catch (error) {
    yield put(
      updateUserError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetUpdateUserStatus());
  }
}

function* deleteUserSaga(action: PayloadAction<string>) {
  try {
    yield call(userService.delete, action.payload);
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(
      deleteUserError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetDeleteUserStatus());
  }
}

export function* watchUserSaga() {
  yield takeLatest(getUser.type, getUserSaga);
  yield takeLatest(updateUser.type, updateUserSaga);
  yield takeLatest(deleteUser.type, deleteUserSaga);
}
