import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';

export interface SystemFeeState {
  totalAmount: number;
  status: QueryStatusEnum;
}

const initialState: SystemFeeState = {
  totalAmount: 0,
  status: QueryStatusEnum.IDLE,
};

export const systemFeeSlice = createSlice({
  name: 'systemFee',
  initialState,
  reducers: {
    getSystemFee: (state) => {
      state.status = QueryStatusEnum.LOADING;
    },

    setSystemFeeSuccess: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
      state.status = QueryStatusEnum.SUCCESS;
    },

    setSystemFeeError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },
  },
});

export const { getSystemFee, setSystemFeeSuccess, setSystemFeeError } =
  systemFeeSlice.actions;

export const selectSystemFee = (state: RootState) => state.systemFee;

export default systemFeeSlice.reducer;
