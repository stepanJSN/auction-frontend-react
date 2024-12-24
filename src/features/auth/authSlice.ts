/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Role } from '../../enums/role.enum'
import { ISingInRequest, ISingInResponse } from '../../types/authService.interfaces';
import { RootState } from '../../redux/store';

export interface AuthState {
  id: string | null;
  role: Role  | null;
  errorCode: number  | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const initialState: AuthState = {
  id: null,
  role: null,
  errorCode: null,
  status: 'idle'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, _action: PayloadAction<ISingInRequest>) => {
      state.status = 'loading'
    },
    signinSuccess: (state, action: PayloadAction<ISingInResponse>) => {
      state.status = 'success'
      state.id = action.payload.id
      state.role = action.payload.role
    },
    signinError: (state, action: PayloadAction<number>) => {
      state.status = 'error'
      state.errorCode = action.payload
    },
    logout(state) {
      state.id = null
      state.role = null;
    }
  }
})

export const { signin, signinSuccess, signinError, logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer