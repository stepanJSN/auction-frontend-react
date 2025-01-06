import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ErrorCodesEnum } from '../../enums/errorCodes.enum';
import {
  createEpisode,
  createEpisodeSuccess,
  deleteEpisodeError,
  deleteEpisodeSuccess,
  filterEpisodesByName,
  getEpisodes,
  getEpisodesError,
  getEpisodesSuccess,
  resetCreateEpisodeStatus,
  resetDeleteEpisodeStatus,
  resetUpdateEpisodeStatus,
  selectEpisodesSearchParams,
  updateEpisodeError,
  updateEpisodeSuccess,
} from './episodesSlice';
import {
  IEpisode,
  IGetEpisodesResponse,
} from '../../types/episodes.interfaces';
import { episodesService } from '../../services/episodesService';
import {
  createLocationError,
  deleteLocation,
  updateLocation,
} from '../locations/locationsSlice';

const NOTIFICATION_TIMEOUT = 1500;

function* getEpisodesSaga(action: PayloadAction<number | undefined>) {
  const episodesSearchParams: { currentPage: number; episodeName: string } =
    yield select(selectEpisodesSearchParams);
  if (episodesSearchParams.currentPage >= (action.payload || 1)) {
    yield put(getEpisodesSuccess(null));
    return;
  }
  try {
    const episodes: IGetEpisodesResponse = yield call(episodesService.getAll, {
      page: action.payload || 1,
      name: episodesSearchParams.episodeName,
    });
    yield put(getEpisodesSuccess(episodes));
  } catch {
    yield put(getEpisodesError());
  }
}

function* filterEpisodesByNameSaga(action: PayloadAction<string>) {
  try {
    const episodes: IGetEpisodesResponse = yield call(episodesService.getAll, {
      name: action.payload,
    });
    yield put(getEpisodesSuccess(episodes));
  } catch {
    yield put(getEpisodesError());
  }
}

function* createEpisodeSaga(action: PayloadAction<IEpisode>) {
  try {
    const location: IEpisode = yield call(
      episodesService.create,
      action.payload,
    );
    yield put(createEpisodeSuccess(location));
  } catch (error) {
    yield put(
      createLocationError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetCreateEpisodeStatus());
  }
}

function* deleteEpisodeSaga(action: PayloadAction<number>) {
  try {
    yield call(episodesService.delete, action.payload);
    yield put(deleteEpisodeSuccess(action.payload));
  } catch (error) {
    yield put(deleteEpisodeError(action.payload));
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetDeleteEpisodeStatus(action.payload));
  }
}

function* updateEpisodeSaga(action: PayloadAction<IEpisode>) {
  try {
    yield call(episodesService.update, action.payload.id, action.payload);
    yield put(updateEpisodeSuccess(action.payload));
  } catch (error) {
    yield put(
      updateEpisodeError({
        id: action.payload.id,
        errorCode: (error as AxiosError).status || ErrorCodesEnum.ServerError,
      }),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetUpdateEpisodeStatus(action.payload.id));
  }
}

export function* watchEpisodesSaga() {
  yield takeLatest(getEpisodes.type, getEpisodesSaga);
  yield takeLatest(filterEpisodesByName.type, filterEpisodesByNameSaga);
  yield takeEvery(createEpisode.type, createEpisodeSaga);
  yield takeEvery(updateLocation.type, updateEpisodeSaga);
  yield takeEvery(deleteLocation.type, deleteEpisodeSaga);
}
