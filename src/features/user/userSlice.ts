import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { IUpdateUser, IUser } from '../../types/user.interfaces';
import { RootState } from '../../redux/store';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { Role } from '../../enums/role.enum';

export interface UserState {
  id: string | null;
  role: Role | null;
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
  updateStatus: MutationStatusEnum;
  deleteStatus: MutationStatusEnum;
  errorCode: number | null;
}

const initialState: UserState = {
  id: null,
  role: null,
  name: null,
  email: null,
  surname: null,
  rating: null,
  balance: null,
  created_at: null,
  errorCode: null,
  status: QueryStatusEnum.IDLE,
  updateStatus: MutationStatusEnum.IDLE,
  deleteStatus: MutationStatusEnum.IDLE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, _action: PayloadAction<string | undefined>) => {
      state.status = QueryStatusEnum.LOADING;
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
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

    updateUser: (
      state,
      _action: PayloadAction<{ id: string; data: IUpdateUser }>,
    ) => {
      state.updateStatus = MutationStatusEnum.PENDING;
    },

    updateUserSuccess: (state, action: PayloadAction<Partial<IUser>>) => {
      state.updateStatus = MutationStatusEnum.SUCCESS;
      Object.assign(state, action.payload);
    },

    updateUserError: (state, action: PayloadAction<number>) => {
      state.updateStatus = MutationStatusEnum.ERROR;
      state.errorCode = action.payload;
    },

    resetUpdateUserStatus: (state) => {
      state.updateStatus = MutationStatusEnum.IDLE;
      state.errorCode = null;
    },

    deleteUser: (state, _action: PayloadAction<string>) => {
      state.deleteStatus = MutationStatusEnum.PENDING;
    },

    deleteUserSuccess: (state) => {
      Object.assign(state, initialState);
      state.deleteStatus = MutationStatusEnum.SUCCESS;
    },

    deleteUserError: (state, action: PayloadAction<number>) => {
      state.deleteStatus = MutationStatusEnum.ERROR;
      state.errorCode = action.payload;
    },

    resetDeleteUserStatus: (state) => {
      state.deleteStatus = MutationStatusEnum.IDLE;
      state.errorCode = null;
    },

    topUpBalance: (state, _action: PayloadAction<number>) => {
      state.updateStatus = MutationStatusEnum.PENDING;
    },

    withdrawBalance: (state, _action: PayloadAction<number>) => {
      state.updateStatus = MutationStatusEnum.PENDING;
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
  resetUpdateUserStatus,
  deleteUser,
  deleteUserSuccess,
  deleteUserError,
  resetDeleteUserStatus,
  topUpBalance,
  withdrawBalance,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
