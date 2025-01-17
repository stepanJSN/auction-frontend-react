import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ISingInRequest, ISingInResponse } from '../../types/auth.interfaces';
import { RootState } from '../../redux/store';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';

export interface AuthState {
  errorCode: number | null;
  status: QueryStatusEnum;
}

const initialState: AuthState = {
  errorCode: null,
  status: QueryStatusEnum.IDLE,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, _action: PayloadAction<ISingInRequest>) => {
      state.status = QueryStatusEnum.LOADING;
    },
    signinSuccess: (
      state,
      _action: PayloadAction<Omit<ISingInResponse, 'accessToken'>>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
    },
    signinError: (state, action: PayloadAction<number>) => {
      state.status = QueryStatusEnum.ERROR;
      state.errorCode = action.payload;
    },
  },
});

export const { signin, signinSuccess, signinError } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
