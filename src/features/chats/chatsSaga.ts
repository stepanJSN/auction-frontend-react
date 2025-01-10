import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ChatsState,
  getChats,
  getChatsError,
  getChatsSuccess,
  selectChats,
  setNameFilter,
  setPage,
} from './chatsSlice';
import { IGetChatsResponse } from '../../types/chats.interfaces';
import { chatsService } from '../../services/chatsService';

function* getChatsSaga() {
  const { currentPage, filters }: ChatsState = yield select(selectChats);

  try {
    const chats: IGetChatsResponse = yield call(chatsService.findAll, {
      page: currentPage,
      name: filters.name,
    });
    yield put(getChatsSuccess(chats));
  } catch {
    yield put(getChatsError());
  }
}

export function* watchChatsSaga() {
  yield takeLatest(
    [getChats.type, setNameFilter.type, setPage.type],
    getChatsSaga,
  );
}
