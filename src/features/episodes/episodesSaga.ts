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
  createEpisodeError,
  createEpisodeSuccess,
  deleteEpisode,
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
  updateEpisode,
  updateEpisodeError,
  updateEpisodeSuccess,
} from './episodesSlice';
import {
  ICreateEpisode,
  IEpisode,
  IGetEpisodesResponse,
} from '../../types/episodes.interfaces';
import { episodesService } from '../../services/episodesService';

const NOTIFICATION_TIMEOUT = 1500;

export function* getEpisodesSaga(action: PayloadAction<number | undefined>) {
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

export function* filterEpisodesByNameSaga(action: PayloadAction<string>) {
  try {
    const episodes: IGetEpisodesResponse = yield call(episodesService.getAll, {
      name: action.payload,
    });
    yield put(getEpisodesSuccess(episodes));
  } catch {
    yield put(getEpisodesError());
  }
}

export function* createEpisodeSaga(action: PayloadAction<ICreateEpisode>) {
  try {
    const episode: IEpisode = yield call(
      episodesService.create,
      action.payload,
    );
    yield put(createEpisodeSuccess(episode));
  } catch (error) {
    yield put(
      createEpisodeError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetCreateEpisodeStatus());
  }
}

export function* deleteEpisodeSaga(action: PayloadAction<number>) {
  try {
    yield call(episodesService.delete, action.payload);
    yield put(deleteEpisodeSuccess(action.payload));
  } catch (error) {
    yield put(deleteEpisodeError(action.payload));
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetDeleteEpisodeStatus(action.payload));
  }
}

export function* updateEpisodeSaga(action: PayloadAction<IEpisode>) {
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
  yield takeEvery(updateEpisode.type, updateEpisodeSaga);
  yield takeEvery(deleteEpisode.type, deleteEpisodeSaga);
}
