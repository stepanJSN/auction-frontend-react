import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import {
  IChatSummary,
  ICreateChatEventPayload,
  IGetChatsResponse,
} from '../../types/chats.interfaces';
import { RootState } from '../../redux/store';
import {
  IDeleteMessageEventPayload,
  IMessageEventPayload,
} from '../../types/message.interfaces';

export interface ChatsState {
  chats: IChatSummary[];
  filters: {
    name: string;
  };
  totalPages: number;
  currentPage: number;
  status: QueryStatusEnum;
}

const initialState: ChatsState = {
  chats: [],
  filters: {
    name: '',
  },
  totalPages: 0,
  currentPage: 1,
  status: QueryStatusEnum.IDLE,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getChats: (state) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getChatsSuccess: (state, action: PayloadAction<IGetChatsResponse>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.chats = action.payload.data;
      state.totalPages = action.payload.info.totalPages;
      state.currentPage = 1;
    },

    getChatsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    getMoreChats: (state) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getMoreChatsSuccess: (state, action: PayloadAction<IGetChatsResponse>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.chats = state.chats.concat(action.payload.data);
      state.currentPage = state.currentPage + 1;
    },

    createChat: (state, action: PayloadAction<ICreateChatEventPayload>) => {
      state.chats.unshift({
        id: action.payload.id,
        name: action.payload.name,
        lastMessage: null,
      });
    },

    setNameFilter: (state, action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.name = action.payload;
      state.currentPage = 0;
      state.chats = [];
    },

    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },

    setLastMessage: (state, action: PayloadAction<IMessageEventPayload>) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === action.payload.chat_id,
      );
      if (
        chatIndex !== -1 &&
        state.chats[chatIndex].lastMessage?.id !== action.payload.id
      ) {
        state.chats[chatIndex].lastMessage = {
          id: action.payload.id,
          message: action.payload.message,
          created_at: action.payload.created_at,
          sender: {
            name: action.payload.sender.name,
            surname: action.payload.sender.surname,
            is_this_user_message: false,
          },
        };
      }
    },

    updateLastMessage: (state, action: PayloadAction<IMessageEventPayload>) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === action.payload.chat_id,
      );
      if (
        chatIndex !== -1 &&
        state.chats[chatIndex].lastMessage?.id === action.payload.id
      ) {
        state.chats[chatIndex].lastMessage.message = action.payload.message;
      }
    },

    deleteLastMessage: (
      state,
      action: PayloadAction<IDeleteMessageEventPayload>,
    ) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === action.payload.chat_id,
      );
      if (
        chatIndex !== -1 &&
        state.chats[chatIndex].lastMessage?.id === action.payload.id
      ) {
        state.chats[chatIndex].lastMessage = null;
      }
    },
  },
});

export const {
  getChats,
  getChatsSuccess,
  getChatsError,
  getMoreChats,
  getMoreChatsSuccess,
  setNameFilter,
  deleteChat,
  createChat,
  setLastMessage,
  updateLastMessage,
  deleteLastMessage,
} = chatsSlice.actions;

export const selectChats = createSelector(
  (state: RootState) => state.chats,
  (chats) => ({
    chats: chats.chats,
    hasMore: chats.totalPages !== chats.currentPage,
    status: chats.status,
  }),
);
export const selectChatsSearchParams = createSelector(
  (state: RootState) => state.chats,
  (chats) => ({
    name: chats.filters.name,
    currentPage: chats.currentPage,
  }),
);

export default chatsSlice.reducer;
