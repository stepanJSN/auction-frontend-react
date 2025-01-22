import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { IUpdateUser, IUser, IUserBalance } from '../../types/user.interfaces';
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
  topUpBalance,
  withdrawBalance,
} from './userSlice';
import { AxiosError } from 'axios';
import { ErrorCodesEnum } from '../../enums/errorCodes.enum';
import { transactionsService } from '../../services/transactionsService';

const NOTIFICATION_TIMEOUT = 3000;

function* getUserSaga(action: PayloadAction<string | undefined>) {
  try {
    if (action.payload) {
      const userData: IUser = yield call(userService.getOne, action.payload);
      yield put(getUserSuccess(userData));
    } else {
      const userData: IUser = yield call(userService.getCurrent);
      yield put(getUserSuccess(userData));
    }
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

function* topUpUserBalanceSaga(action: PayloadAction<number>) {
  try {
    const newBalance: IUserBalance = yield call(
      transactionsService.topUp,
      action.payload,
    );
    yield put(updateUserSuccess({ balance: newBalance }));
  } catch (error) {
    yield put(
      updateUserError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
  }
}

function* withdrawUserBalanceSaga(action: PayloadAction<number>) {
  try {
    const newBalance: IUserBalance = yield call(
      transactionsService.withdraw,
      action.payload,
    );
    yield put(updateUserSuccess({ balance: newBalance }));
  } catch (error) {
    yield put(
      updateUserError(
        (error as AxiosError).response?.data?.code ||
          (error as AxiosError).status ||
          ErrorCodesEnum.ServerError,
      ),
    );
  }
}

export function* watchUserSaga() {
  yield takeLatest(getUser.type, getUserSaga);
  yield takeLatest(updateUser.type, updateUserSaga);
  yield takeLatest(deleteUser.type, deleteUserSaga);
  yield takeLatest(topUpBalance.type, topUpUserBalanceSaga);
  yield takeLatest(withdrawBalance.type, withdrawUserBalanceSaga);
}
