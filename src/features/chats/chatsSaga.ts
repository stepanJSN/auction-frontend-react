import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getChats,
  getChatsError,
  getChatsSuccess,
  getMoreChats,
  getMoreChatsSuccess,
  selectChatsSearchParams,
  setNameFilter,
} from './chatsSlice';
import { IGetChatsResponse } from '../../types/chats.interfaces';
import { chatsService } from '../../services/chatsService';

export function* getChatsSaga() {
  const { name }: { name: string } = yield select(selectChatsSearchParams);

  try {
    const chats: IGetChatsResponse = yield call(chatsService.findAll, {
      page: 1,
      name,
    });
    yield put(getChatsSuccess(chats));
  } catch {
    yield put(getChatsError());
  }
}

export function* getMoreChatsSaga() {
  const { currentPage }: { currentPage: number } = yield select(
    selectChatsSearchParams,
  );
  try {
    const chats: IGetChatsResponse = yield call(chatsService.findAll, {
      page: currentPage + 1,
    });
    yield put(getMoreChatsSuccess(chats));
  } catch {
    yield put(getChatsError());
  }
}

export function* watchChatsSaga() {
  yield takeLatest([getChats.type, setNameFilter.type], getChatsSaga);
  yield takeLatest(getMoreChats.type, getMoreChatsSaga);
}
