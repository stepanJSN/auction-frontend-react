import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { IChatSummary, IGetChatsResponse } from '../../types/chats.interfaces';
import { RootState } from '../../redux/store';

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
    },

    getChatsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    setNameFilter: (state, action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
      state.filters.name = action.payload;
      state.currentPage = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = action.payload;
    },
  },
});

export const {
  getChats,
  getChatsSuccess,
  getChatsError,
  setNameFilter,
  setPage,
} = chatsSlice.actions;

export const selectChats = (state: RootState) => state.chats;
export const selectFilters = (state: RootState) => state.chats.filters;

export default chatsSlice.reducer;
