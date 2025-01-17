import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ICardsStatisticsResponse,
  IGeneralStatistics,
  ISetsStatisticsResponse,
  IUsersStatistics,
} from '../../types/statistics.interfaces';
import { statisticsService } from '../../services/statisticsService';
import {
  getCardsStatistics,
  getGeneralStatistics,
  getSetsStatistics,
  getUsersStatistics,
  setCardsStatisticsError,
  setCardsStatisticsSuccess,
  setGeneralStatisticsError,
  setGeneralStatisticsSuccess,
  setSetsStatisticsError,
  setSetsStatisticsSuccess,
  setUsersStatisticsError,
  setUsersStatisticsSuccess,
} from './statisticsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getGeneralStatisticsSaga() {
  try {
    const generalStatistics: IGeneralStatistics = yield call(
      statisticsService.findGeneralStatistics,
    );
    yield put(setGeneralStatisticsSuccess(generalStatistics));
  } catch {
    yield put(setGeneralStatisticsError());
  }
}

function* getUsersStatisticsSaga(action: PayloadAction<number>) {
  try {
    const usersStatistics: IUsersStatistics[] = yield call(
      statisticsService.findUserStatistics,
      action.payload,
    );
    yield put(setUsersStatisticsSuccess(usersStatistics));
  } catch {
    yield put(setUsersStatisticsError());
  }
}

function* getCardsStatisticsSaga(action: PayloadAction<number>) {
  try {
    const cardsStatistics: ICardsStatisticsResponse = yield call(
      statisticsService.findCardsStatistics,
      action.payload,
    );
    yield put(setCardsStatisticsSuccess(cardsStatistics));
  } catch {
    yield put(setCardsStatisticsError());
  }
}

function* getSetsStatisticsSaga(action: PayloadAction<number>) {
  try {
    const setsStatistics: ISetsStatisticsResponse = yield call(
      statisticsService.findSetsStatistics,
      action.payload,
    );
    yield put(setSetsStatisticsSuccess(setsStatistics));
  } catch {
    yield put(setSetsStatisticsError());
  }
}

export function* watchStatisticsSaga() {
  yield takeLatest(getGeneralStatistics.type, getGeneralStatisticsSaga);
  yield takeLatest(getUsersStatistics.type, getUsersStatisticsSaga);
  yield takeLatest(getSetsStatistics.type, getSetsStatisticsSaga);
  yield takeLatest(getCardsStatistics.type, getCardsStatisticsSaga);
}
