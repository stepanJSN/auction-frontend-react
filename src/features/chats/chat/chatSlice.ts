import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { QueryStatusEnum } from '../../../enums/queryStatus.enum';
import {
  ICreateMessage,
  IGetMessagesResponse,
  IMessage,
} from '../../../types/message.interfaces';
import { IChat } from '../../../types/chats.interfaces';
import { RootState } from '../../../redux/store';

export interface MessageState {
  id?: string;
  created_at?: string;
  message: string;
  sender: {
    name?: string;
    surname?: string;
    is_this_user_message: boolean;
  };
  creationStatus: MutationStatusEnum;
}

export interface ChatState {
  name: string | null;
  participants: {
    id: string;
    name: string;
    surname: string;
  }[];
  messages: {
    data: MessageState[];
    status: QueryStatusEnum;
    cursor: string;
    hasNextPage: boolean;
  };
  status: QueryStatusEnum;
}

const initialState: ChatState = {
  name: null,
  participants: [],
  messages: {
    data: [],
    status: QueryStatusEnum.LOADING,
    cursor: '',
    hasNextPage: false,
  },
  status: QueryStatusEnum.LOADING,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getChat: (state, _action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
      state.messages.status = QueryStatusEnum.LOADING;
    },

    setChatData: (state, action: PayloadAction<IChat>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.name = action.payload.name;
      state.participants = action.payload.users;
    },

    setChatError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    getMoreMessages: (state, _action: PayloadAction<string>) => {
      state.messages.status = QueryStatusEnum.LOADING;
    },

    setInitialMessages: (
      state,
      action: PayloadAction<IGetMessagesResponse>,
    ) => {
      state.messages = {
        data: action.payload.data.map((message) => ({
          ...message,
          creationStatus: MutationStatusEnum.SUCCESS,
        })),
        status: QueryStatusEnum.SUCCESS,
        cursor: action.payload.pagination.cursor,
        hasNextPage: action.payload.pagination.hasNextPage,
      };
    },

    setMessagesError: (state) => {
      state.messages.status = QueryStatusEnum.ERROR;
    },

    appendMessages: (state, action: PayloadAction<IGetMessagesResponse>) => {
      state.messages = {
        data: state.messages.data.concat(
          action.payload.data.map((message) => ({
            ...message,
            creationStatus: MutationStatusEnum.SUCCESS,
          })),
        ),
        status: QueryStatusEnum.SUCCESS,
        cursor: action.payload.pagination.cursor,
        hasNextPage: action.payload.pagination.hasNextPage,
      };
    },

    createMessage: (
      state,
      action: PayloadAction<ICreateMessage & { tempId: string }>,
    ) => {
      state.messages.data.push({
        id: action.payload.tempId,
        message: action.payload.message,
        sender: {
          is_this_user_message: true,
        },
        creationStatus: MutationStatusEnum.PENDING,
      });
    },

    setMessageCreationSuccess: (
      state,
      action: PayloadAction<IMessage & { tempId: string }>,
    ) => {
      const messageIndex = state.messages.data.findIndex(
        (message) => message.id === action.payload.tempId,
      );
      if (messageIndex !== -1) {
        state.messages.data[messageIndex] = {
          ...action.payload,
          creationStatus: MutationStatusEnum.SUCCESS,
        };
      }
    },

    setMessageCreationError: (
      state,
      action: PayloadAction<{ tempId: string }>,
    ) => {
      const messageIndex = state.messages.data.findIndex(
        (message) => message.id === action.payload.tempId,
      );
      if (messageIndex !== -1) {
        state.messages.data[messageIndex].creationStatus =
          MutationStatusEnum.SUCCESS;
      }
    },

    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.data.push({
        ...action.payload,
        creationStatus: MutationStatusEnum.SUCCESS,
      });
    },
  },
});

export const {
  getChat,
  setChatData,
  setChatError,
  getMoreMessages,
  setInitialMessages,
  setMessagesError,
  appendMessages,
  addMessage,
  createMessage,
  setMessageCreationError,
  setMessageCreationSuccess,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;
export const selectMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
