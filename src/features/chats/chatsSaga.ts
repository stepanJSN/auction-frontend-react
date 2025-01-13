import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getChats,
  getChatsError,
  getChatsSuccess,
  getMoreChats,
  selectChatsSearchParams,
  setNameFilter,
} from './chatsSlice';
import { IGetChatsResponse } from '../../types/chats.interfaces';
import { chatsService } from '../../services/chatsService';

function* getChatsSaga() {
  const { currentPage, name }: { currentPage: number; name: string } =
    yield select(selectChatsSearchParams);

  try {
    const chats: IGetChatsResponse = yield call(chatsService.findAll, {
      page: currentPage,
      name,
    });
    yield put(getChatsSuccess(chats));
  } catch {
    yield put(getChatsError());
  }
}

export function* watchChatsSaga() {
  yield takeLatest(
    [getChats.type, setNameFilter.type, getMoreChats.type],
    getChatsSaga,
  );
}
