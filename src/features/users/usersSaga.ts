import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  changeFilterParams,
  getUsers,
  getUsersError,
  getUsersSuccess,
  selectUsersSearchParams,
  UsersState,
} from './usersSlice';
import { userService } from '../../services/userService';
import {
  IGetUsersResponse,
  UsersSortTypeEnum,
} from '../../types/user.interfaces';
import { SortOrderEnum } from '../../enums/sortOrder.enum';

function* getUsersSaga(action?: PayloadAction<number>) {
  const usersSearchParams: Pick<
    UsersState,
    'sortOrder' | 'sortType' | 'showOnlyAdmins'
  > = yield select(selectUsersSearchParams);
  try {
    const users: IGetUsersResponse = yield call(userService.getAll, {
      page: action?.payload || 1,
      sortType: usersSearchParams.sortType,
      sortOrder: usersSearchParams.sortOrder,
      isAdmin: usersSearchParams.showOnlyAdmins,
    });
    yield put(getUsersSuccess(users));
  } catch {
    yield put(getUsersError());
  }
}

function* changeFilterParamsSaga(
  action: PayloadAction<{
    sortType: UsersSortTypeEnum;
    sortOrder: SortOrderEnum;
    showOnlyAdmins: boolean;
  }>,
) {
  try {
    const users: IGetUsersResponse = yield call(userService.getAll, {
      sortType: action.payload.sortType,
      sortOrder: action.payload.sortOrder,
      isAdmin: action.payload.showOnlyAdmins,
    });
    yield put(getUsersSuccess(users));
  } catch {
    yield put(getUsersError());
  }
}

export function* watchUsersSaga() {
  yield takeLatest(getUsers.type, getUsersSaga);
  yield takeLatest(changeFilterParams.type, changeFilterParamsSaga);
}
