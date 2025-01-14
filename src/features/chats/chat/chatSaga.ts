import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  appendMessages,
  ChatState,
  createMessage,
  getChat,
  getMoreMessages,
  selectMessages,
  setChatData,
  setChatError,
  setInitialMessages,
  setMessageCreationError,
  setMessageCreationSuccess,
  setMessagesError,
} from './chatSlice';
import { chatsService } from '../../../services/chatsService';
import { PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../../../types/chats.interfaces';
import {
  ICreateMessage,
  IGetMessagesResponse,
  IMessage,
} from '../../../types/message.interfaces';

function* getChatSaga(action: PayloadAction<string>) {
  try {
    const chat: IChat = yield call(chatsService.findOne, action.payload);
    yield put(setChatData(chat));
  } catch {
    yield put(setChatError());
  }

  try {
    const messages: IGetMessagesResponse = yield call(
      chatsService.findAllMessages,
      {
        id: action.payload,
      },
    );
    yield put(setInitialMessages(messages));
  } catch {
    yield put(setMessagesError());
  }
}

function* getMoreMessagesSaga(action: PayloadAction<string>) {
  const { cursor }: ChatState['messages'] = yield select(selectMessages);
  try {
    const messages: IGetMessagesResponse = yield call(
      chatsService.findAllMessages,
      {
        id: action.payload,
        cursor,
      },
    );
    yield put(appendMessages(messages));
  } catch {
    yield put(setMessagesError());
  }
}

function* createMessageSaga(
  action: PayloadAction<ICreateMessage & { tempId: string }>,
) {
  try {
    const message: IMessage = yield call(
      chatsService.createMessage,
      action.payload,
    );
    yield put(
      setMessageCreationSuccess({ ...message, tempId: action.payload.tempId }),
    );
  } catch {
    yield put(setMessageCreationError({ tempId: action.payload.tempId }));
  }
}

export function* watchChatSaga() {
  yield takeLatest(getChat.type, getChatSaga);
  yield takeLatest(getMoreMessages.type, getMoreMessagesSaga);
  yield takeEvery(createMessage.type, createMessageSaga);
}
