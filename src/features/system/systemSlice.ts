import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { IExchangeRate } from '../../types/system.interfaces';

export interface SystemState {
  exchangeRate: {
    value: number;
    updatedAt: string;
    status: QueryStatusEnum;
    updateStatus: MutationStatusEnum;
  };
}

const initialState: SystemState = {
  exchangeRate: {
    value: 0,
    updatedAt: '',
    status: QueryStatusEnum.IDLE,
    updateStatus: MutationStatusEnum.IDLE,
  },
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    getExchangeRate: (state) => {
      state.exchangeRate.status = QueryStatusEnum.LOADING;
    },

    setExchangeRate: (state, action: PayloadAction<IExchangeRate>) => {
      state.exchangeRate.value = action.payload.exchange_rate;
      state.exchangeRate.updatedAt = action.payload.updated_at;
      state.exchangeRate.status = QueryStatusEnum.SUCCESS;
    },

    setExchangeRateError: (state) => {
      state.exchangeRate.status = QueryStatusEnum.ERROR;
    },

    updateExchangeRate: (state) => {
      state.exchangeRate.updateStatus = MutationStatusEnum.PENDING;
    },

    setUpdateExchangeRateStatusSuccess: (state) => {
      state.exchangeRate.updateStatus = MutationStatusEnum.SUCCESS;
    },

    setUpdateExchangeRateStatusError: (state) => {
      state.exchangeRate.updateStatus = MutationStatusEnum.ERROR;
    },
  },
});

export const { getExchangeRate, setExchangeRate, setExchangeRateError } =
  systemSlice.actions;

export const selectExchangeRate = (state: RootState) =>
  state.system.exchangeRate;

export default systemSlice.reducer;
