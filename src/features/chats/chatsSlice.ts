import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { IChatSummary, IGetChatsResponse } from '../../types/chats.interfaces';
import { RootState } from '../../redux/store';
import { IMessageEventPayload } from '../../types/message.interfaces';

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
      state.chats.push(...action.payload.data);
      state.totalPages = action.payload.info.totalPages;
    },

    getChatsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    getMoreChats: (state) => {
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = state.currentPage + 1;
    },

    setNameFilter: (state, action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.name = action.payload;
      state.currentPage = 1;
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
  },
});

export const {
  getChats,
  getChatsSuccess,
  getChatsError,
  getMoreChats,
  setNameFilter,
  deleteChat,
  setLastMessage,
  updateLastMessage,
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
