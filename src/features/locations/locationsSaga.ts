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
  createLocation,
  createLocationError,
  createLocationSuccess,
  deleteLocation,
  deleteLocationError,
  deleteLocationSuccess,
  filterLocationsByName,
  getLocations,
  getLocationsError,
  getLocationsSuccess,
  resetCreateLocationStatus,
  resetDeleteLocationStatus,
  resetUpdateLocationStatus,
  selectLocationsSearchParams,
  updateLocation,
  updateLocationError,
  updateLocationSuccess,
} from './locationsSlice';
import {
  IGetLocationsResponse,
  ILocation,
} from '../../types/locations.interfaces';
import { locationsService } from '../../services/locationsService';
import { AxiosError } from 'axios';
import { ErrorCodesEnum } from '../../enums/errorCodes.enum';

const NOTIFICATION_TIMEOUT = 1500;

function* getLocationsSaga(action: PayloadAction<number | undefined>) {
  const locationsSearchParams: { currentPage: number; locationName: string } =
    yield select(selectLocationsSearchParams);
  if (locationsSearchParams.currentPage >= (action.payload || 1)) {
    yield put(getLocationsSuccess(null));
    return;
  }
  try {
    const users: IGetLocationsResponse = yield call(locationsService.getAll, {
      page: action.payload || 1,
      name: locationsSearchParams.locationName,
    });
    yield put(getLocationsSuccess(users));
  } catch {
    yield put(getLocationsError());
  }
}

function* filterLocationsByNameSaga(action: PayloadAction<string>) {
  try {
    const users: IGetLocationsResponse = yield call(locationsService.getAll, {
      name: action.payload,
    });
    yield put(getLocationsSuccess(users));
  } catch {
    yield put(getLocationsError());
  }
}

function* createLocationSaga(action: PayloadAction<ILocation>) {
  try {
    yield call(locationsService.create, action.payload);
    yield put(createLocationSuccess(action.payload));
  } catch (error) {
    yield put(
      createLocationError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetCreateLocationStatus());
  }
}

function* deleteLocationSaga(action: PayloadAction<number>) {
  try {
    yield call(locationsService.delete, action.payload);
    yield put(deleteLocationSuccess(action.payload));
  } catch (error) {
    yield put(deleteLocationError(action.payload));
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetDeleteLocationStatus(action.payload));
  }
}

function* updateLocationSaga(action: PayloadAction<ILocation>) {
  try {
    yield call(locationsService.update, action.payload.id, action.payload);
    yield put(updateLocationSuccess(action.payload));
  } catch (error) {
    yield put(updateLocationError(action.payload.id));
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetUpdateLocationStatus(action.payload.id));
  }
}

export function* watchLocationsSaga() {
  yield takeLatest(getLocations.type, getLocationsSaga);
  yield takeLatest(filterLocationsByName.type, filterLocationsByNameSaga);
  yield takeEvery(createLocation.type, createLocationSaga);
  yield takeEvery(updateLocation.type, updateLocationSaga);
  yield takeEvery(deleteLocation.type, deleteLocationSaga);
}
