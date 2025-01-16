import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { QueryStatusEnum } from '../../../enums/queryStatus.enum';
import {
  ICreateMessage,
  IDeleteMessage,
  IGetMessagesResponse,
  IMessage,
} from '../../../types/message.interfaces';
import { IChat, IUpdateChat } from '../../../types/chats.interfaces';
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
  deletionStatus: MutationStatusEnum;
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
  updateStatus: MutationStatusEnum;
  updateErrorCode: number | null;
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
  updateStatus: MutationStatusEnum.IDLE,
  updateErrorCode: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getChat: (state, _action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
      state.messages.status = QueryStatusEnum.LOADING;
      state.updateStatus = MutationStatusEnum.IDLE;
      state.updateErrorCode = null;
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
          deletionStatus: MutationStatusEnum.IDLE,
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
      state.messages.data.unshift(
        ...action.payload.data.map((message) => ({
          ...message,
          creationStatus: MutationStatusEnum.SUCCESS,
          deletionStatus: MutationStatusEnum.IDLE,
        })),
      );
      state.messages.status = QueryStatusEnum.SUCCESS;
      state.messages.cursor = action.payload.pagination.cursor;
      state.messages.hasNextPage = action.payload.pagination.hasNextPage;
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
        deletionStatus: MutationStatusEnum.IDLE,
      });
    },

    resendMessage: (
      state,
      action: PayloadAction<{ tempId: string; chatId: string }>,
    ) => {
      const messageIndex = state.messages.data.findIndex(
        (message) => message.id === action.payload.tempId,
      );
      if (messageIndex !== -1) {
        state.messages.data[messageIndex].creationStatus =
          MutationStatusEnum.PENDING;
      }
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
          deletionStatus: MutationStatusEnum.IDLE,
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
          MutationStatusEnum.ERROR;
      }
    },

    deleteMessage: (state, action: PayloadAction<IDeleteMessage>) => {
      const messageIndex = state.messages.data.findIndex(
        (message) => message.id === action.payload.messageId,
      );
      if (messageIndex !== -1) {
        state.messages.data[messageIndex].deletionStatus =
          MutationStatusEnum.PENDING;
      }
    },

    setDeleteMessageSuccess: (state, action: PayloadAction<string>) => {
      state.messages.data = state.messages.data.filter(
        (message) => message.id !== action.payload,
      );
    },

    setDeleteMessageError: (state, action: PayloadAction<string>) => {
      const messageIndex = state.messages.data.findIndex(
        (message) => message.id === action.payload,
      );
      if (messageIndex !== -1) {
        state.messages.data[messageIndex].deletionStatus =
          MutationStatusEnum.ERROR;
      }
    },

    addMessage: (
      state,
      action: PayloadAction<
        Omit<IMessage, 'sender'> & {
          sender: Omit<IMessage['sender'], 'is_this_user_message'>;
        }
      >,
    ) => {
      state.messages.data.push({
        id: action.payload.id,
        created_at: action.payload.created_at,
        message: action.payload.message,
        sender: {
          name: action.payload.sender.name,
          surname: action.payload.sender.surname,
          is_this_user_message: false,
        },
        creationStatus: MutationStatusEnum.SUCCESS,
        deletionStatus: MutationStatusEnum.IDLE,
      });
    },

    updateChat: (
      state,
      _action: PayloadAction<IUpdateChat & { id: string }>,
    ) => {
      state.updateStatus = MutationStatusEnum.PENDING;
    },

    setUpdateChatStatusSuccess: (state) => {
      state.updateStatus = MutationStatusEnum.SUCCESS;
    },

    setUpdateChatStatusError: (state, action: PayloadAction<number>) => {
      state.updateStatus = MutationStatusEnum.ERROR;
      state.updateErrorCode = action.payload;
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
  resendMessage,
  setMessageCreationError,
  setMessageCreationSuccess,
  deleteMessage,
  setDeleteMessageError,
  setDeleteMessageSuccess,
  updateChat,
  setUpdateChatStatusError,
  setUpdateChatStatusSuccess,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;
export const selectMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
