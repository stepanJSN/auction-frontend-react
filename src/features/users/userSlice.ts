import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { IUser } from '../../types/userService.interfaces';
import { RootState } from '../../redux/store';

export interface UserState {
  name: string | null;
  email: string | null;
  surname: string | null;
  rating: number | null;
  balance: {
    available: number;
    total: number;
  } | null;
  created_at: Date | null;
  status: QueryStatusEnum;
  errorCode: number | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  surname: null,
  rating: null,
  balance: null,
  created_at: null,
  errorCode: null,
  status: QueryStatusEnum.IDLE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, _action: PayloadAction<string>) => {
      state.status = QueryStatusEnum.LOADING;
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.status = QueryStatusEnum.SUCCESS;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.surname = action.payload.surname;
      state.rating = action.payload.rating;
      state.balance = action.payload.balance;
      state.created_at = action.payload.created_at;
    },
    getUserError: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.ERROR;
      state.errorCode = action.payload;
    },

    updateUserSuccess: (
      state,
      action: PayloadAction<Omit<IUser, 'balance'>>,
    ) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
    },

    deleteUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserError,
  updateUserSuccess,
  deleteUser,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
