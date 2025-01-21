import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';

export interface SystemState {
  exchangeRate: number;
  status: QueryStatusEnum;
}

const initialState: SystemState = {
  exchangeRate: 0,
  status: QueryStatusEnum.IDLE,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    getExchangeRate: (state) => {
      state.status = QueryStatusEnum.LOADING;
    },

    setExchangeRate: (state, action: PayloadAction<number>) => {
      state.exchangeRate = action.payload;
      state.status = QueryStatusEnum.SUCCESS;
    },

    setExchangeRateError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },
  },
});

export const { getExchangeRate, setExchangeRate, setExchangeRateError } =
  systemSlice.actions;

export const selectSystem = (state: RootState) => state.system;

export default systemSlice.reducer;
