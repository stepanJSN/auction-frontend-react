import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  appendMessages,
  ChatState,
  createMessage,
  deleteMessage,
  getChat,
  getMoreMessages,
  resendMessage,
  selectMessages,
  setChatData,
  setChatError,
  setDeleteMessageError,
  setDeleteMessageSuccess,
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
  IDeleteMessage,
  IGetMessagesResponse,
  IMessage,
} from '../../../types/message.interfaces';
import { RootState } from '../../../redux/store';

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

function* resendMessageSaga(
  action: PayloadAction<{ tempId: string; chatId: string }>,
) {
  const messageWithError: { id: string; message: string } = yield select(
    (state: RootState) =>
      state.chat.messages.data.find(
        (message) => message.id === action.payload.tempId,
      ),
  );

  try {
    const message: IMessage = yield call(chatsService.createMessage, {
      ...messageWithError,
      chatId: action.payload.chatId,
    });
    yield put(
      setMessageCreationSuccess({
        ...message,
        tempId: action.payload.tempId,
      }),
    );
  } catch {
    yield put(setMessageCreationError({ tempId: action.payload.tempId }));
  }
}

function* deleteMessageSaga(action: PayloadAction<IDeleteMessage>) {
  try {
    yield call(chatsService.deleteMessage, action.payload);
    yield put(setDeleteMessageSuccess(action.payload.messageId));
  } catch {
    yield put(setDeleteMessageError(action.payload.messageId));
  }
}

export function* watchChatSaga() {
  yield takeLatest(getChat.type, getChatSaga);
  yield takeLatest(getMoreMessages.type, getMoreMessagesSaga);
  yield takeEvery(createMessage.type, createMessageSaga);
  yield takeEvery(resendMessage.type, resendMessageSaga);
  yield takeEvery(deleteMessage.type, deleteMessageSaga);
}
