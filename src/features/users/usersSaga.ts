import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  changeFilterParams,
  deleteUser,
  deleteUserError,
  deleteUserSuccess,
  getUsers,
  getUsersError,
  getUsersSuccess,
  resetDeleteUserStatus,
  resetUpdateUserRoleStatus,
  selectUsersSearchParams,
  updateUserRole,
  updateUserRoleError,
  updateUserRoleSuccess,
  UsersState,
} from './usersSlice';
import { userService } from '../../services/userService';
import {
  IGetUsersResponse,
  IUpdateUserRole,
  UsersSortTypeEnum,
} from '../../types/user.interfaces';
import { SortOrderEnum } from '../../enums/sortOrder.enum';

const NOTIFICATION_TIMEOUT = 1500;

function* getUsersSaga(action: PayloadAction<number | undefined>) {
  const usersSearchParams: Pick<
    UsersState,
    'sortOrder' | 'sortType' | 'showOnlyAdmins' | 'currentPage'
  > = yield select(selectUsersSearchParams);
  if (usersSearchParams.currentPage >= (action.payload || 1)) {
    yield put(getUsersSuccess(null));
    return;
  }
  try {
    const users: IGetUsersResponse = yield call(userService.getAll, {
      page: action.payload || 1,
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

function* deleteUserSaga(action: PayloadAction<string>) {
  try {
    yield call(userService.delete, action.payload);
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    yield put(deleteUserError(action.payload));
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetDeleteUserStatus(action.payload));
  }
}

function* updateUserRoleSaga(action: PayloadAction<IUpdateUserRole>) {
  try {
    yield call(userService.changeRole, action.payload.id, action.payload.role);
    yield put(updateUserRoleSuccess(action.payload));
  } catch (error) {
    yield put(updateUserRoleError(action.payload.id));
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetUpdateUserRoleStatus(action.payload.id));
  }
}

export function* watchUsersSaga() {
  yield takeLatest(getUsers.type, getUsersSaga);
  yield takeLatest(changeFilterParams.type, changeFilterParamsSaga);
  yield takeEvery(updateUserRole.type, updateUserRoleSaga);
  yield takeEvery(deleteUser.type, deleteUserSaga);
}
